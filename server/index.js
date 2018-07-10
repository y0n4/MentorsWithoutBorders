
require('dotenv').load({ silent: true });

const express = require('express');
const http = require('http');
const axios = require('axios');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');

const { AccessToken } = require('twilio').jwt;

const { VideoGrant } = AccessToken;
const cors = require('cors');

const app = express();
const server = http.Server(app);
const io = socketIo(server);

// ⬇⬇⬇ for google oauth ⬇⬇⬇
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const twitter = require('./twitter');
const { getPersonality, getTextSummary } = require('./personality');
const { addDataToHeroku } = require('../database/dummyGen/generator');
const { speechToText, translate, languageSupportList } = require('./watson');
const auth = require('./auth');
const exampleData = require('./exampleData').exampleMessages;
const userData = require('../database/dummyGen/users').userList.results;
const { getCategoryIds } = require('./extractingInfo');
// temp stuff
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

auth(passport);
app.use(passport.initialize());
app.use(
  cookieSession({
    name: 'session',
    keys: ['123'],
  }),
);
app.use(cookieParser());

// ⬆⬆⬆ end ⬆⬆

speechToText(app);

const port = process.env.PORT || 3000;
const data = require('../database');

const users = {};

io.on('connection', (socket) => {
  console.log('✅  Socket Connection from id:', socket.id);
  users[socket.id] = {};
  socket.emit('loginCheck');
  let logInTime = new Date().getHours();

  socket.on('userLoggedIn', (client) => {
    console.log('🔑🔑🔑 ', client.name, 'Logged In', client);
    users[socket.id] = {
      userId: client.userId,
      name: client.name,
      photo: client.photo,
    };
    console.log('✅✅✅getmy', users[socket.id].userId);
    data.loginUser(client.userId, socket.id);
    data.getMyMentors(users[socket.id].userId, (mentors) => {
      console.log('hey', mentors);
      socket.emit('mentorsOnline', mentors);
    });
  });

  // socket.on('getMyMentors', () => {
  //   console.log('✅✅✅✅✅getmymentors', users[socket.id].userId);
  //   data.getMyMentors(users[socket.id].userId, (mentors) => {
  //     socket.emit('mentorsOnline', mentors);
  //   });
  // });


  socket.on('new message', (message) => {
    console.log('✉️ socket.new message', message);
    socket.broadcast.emit('new message', message);
    io.to(socket.id).emit('new message', message);
  });

  socket.on('translationJob', (text) => {
    console.log('text', text);
    translate(text, socket);
  });

  socket.on('chatRequest', (client) => {
    // console.log(client)
    data.getSocketId(client.toUserId, (user) => {
      const roomName = `${client.userId}${user.id}`;
      const reqPkg = {
        from: user.id,
        roomName,
      };
      console.log(user.socket, '⛔⛔ UserSocket @ chatrequest 94');
      io.to(user.socket).emit('request', reqPkg);
    });
  });

  socket.on('disconnect', () => {
    // console.log('⛔ ', users[socket.id], 'Disconnected from socket');
    io.emit('userDisconnect', socket.id);
    console.log(users[socket.id].userId);
    data.logoutUser(users[socket.id].userId);
    let logOutTime = new Date().getHours();
    data.setAvgLoggedInTime(users[socket.id].userId, logInTime, logOutTime);
    delete users[socket.id];
  });
});

app.use(cors());
app.use(express.static(`${__dirname}/../client/dist`));


// ------------google oauth------------//
app.get('/home', (req, res) => {
  if (req.session.token) {
    console.log('user is already logged in');
    const googleId = req.session.passport.user.profile.id;

    data.findUser(googleId, (results) => {
      // console.log(JSON.stringify(results.googleId));
      res.json({
        status: 'cookie',
        dbInfo: results,
      });
    });

    res.cookie('token', req.session.token);
  } else {
    console.log('user not yet logged in');
    res.cookie('token', '');
    res.json({
      status: 'no cookie',
    });
  }
});

// redirects client to google login page
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile'],
  }),
);

// when user successfully logs in
app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/', // back to homepage
  }), (req, res) => {
    const info = { // info to save into db
      googleId: req.user.profile.id,
      fullName: `${req.user.profile.name.givenName} ${req.user.profile.name.familyName}`,
      gender: req.user.profile.gender,
      photo: req.user.profile._json.image.url,
      locale: req.user.profile._json.language,
    };

    // check if user exists
    data.findUser(info.googleId, (results) => {
      if (results === null) { // null is if user doesn't exist
        axios({ // get users approximate location
          method: 'get',
          url: 'https://geoip-db.com/json/',
          responseType: 'json',
        })
          .then((response) => {
            info.location = {
              latLng: [response.data.latitude, response.data.longitude],
              name: response.data.city,
            };
            data.saveUser(info);
          });
      }
    });
    req.session.token = req.user.token; // set cookies
    res.redirect('/'); // back to homepage
  },
);

app.get('/logout', (req, res) => {
  req.logout();
  req.session = null;
  res.redirect('/');
});
// ------------google oauth end------------//

// retreives all location from db
app.get('/map', (req, res) => {
  data.allLocation((results) => {
    res.send(results);
  });
});

app.get('/token', (req, res) => {
  const identity = req.session.passport.user.profile.displayName;

  // Create access token, signed and returned to client containing grant
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID || require('../config').TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY || require('../config').TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET || require('../config').TWILIO_API_SECRET,
  );
  // Assign generated identity to token
  token.identity = identity;

  const grant = new VideoGrant();
  // Grant token access to the video API features
  token.addGrant(grant);

  // Serialize token to JWT string and include JSON response
  res.send({
    identity,
    token: token.toJwt(),
  });
});

// Send the user data to MentorSearch component
app.get('/recommendation', (req, res) => {
  let userId = req.session.passport.user.profile.id;
  
  data.findUser(userId, (user) => {
    let currentUserId = user.id;

    data.getCurrentUserCategories(currentUserId, (datas) => {
      let categories = getCategoryIds(datas);
      
      data.getAllMentors((mentors) => {
        res.send({
          userCategories: categories,
          allMentors: mentors,
          currentUser: user
        });
      });
    });
  });
});

app.get('/allMentors', (req, res) => {
  res.send(userData);
});


app.post('/result', (req, res) => {
  console.log(req.body.twitterHandle, '🐣🐣🐣🐣🐣🐣');
  const handle = req.body.twitterHandle;
  twitter.getTwitterProfile(handle)
    .then(profile => twitter.processTweets(handle))
    .then(tweets => getPersonality(tweets))
    .then(summary => res.json(summary))
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  // res.sendFile(`${__dirname}/../client/dist/index.html`);
});

// app.get('/*', (req, res) => {
//   // console.log(req.session);s
//   res.redirect('/');
// });
server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});