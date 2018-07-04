require('dotenv').load({ silent: true });

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
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
const { speechToText, translate } = require('./watson');
const auth = require('./auth');
const exampleData = require('./exampleData').exampleMessages;
// temp stuff
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
// const data = require('../database');

const users = {};

io.on('connection', (socket) => {
  console.log('New Socket Connection from id', socket.id);

  // socket.emit('get message', exampleData);

  socket.on('new message', (message) => {
    console.log('new message rec', message);

    socket.broadcast.emit('new message', message);
    io.to(socket.id).emit('new message', message);
  });

  socket.on('translationJob', (text) => {
    console.log('text', text);
    translate(text, socket);
  });
});

app.use(cors());
app.use(express.static(`${__dirname}/../client/dist`));

// ------------google oauth------------//
app.get('/home', (req, res) => {
  if (req.session.token) {
    console.log('user is already logged in');
    const googleId = req.session.passport.user.profile.id;

    // data.findUser(googleId, (results) => {
    //   // console.log(JSON.stringify(results.googleId));
    //   res.json({
    //     status: 'cookie',
    //     dbInfo: results,
    //   });
    // });

    // res.cookie('token', req.session.token);
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
    };

    // // check if user exists
    // data.findUser(info.googleId, (results) => {
    //   // console.log(results, 'this is from data.findUser');
    //   if (results === null) { // null is if user doesn't exist
    //     data.saveUser(info); // save 2 database
    //   }
    // });
    // req.session.token = req.user.token; // set cookies
    res.redirect('/'); // back to homepage
  },
);

app.get('/logout', (req, res) => {
  req.logout();
  req.session = null;
  res.redirect('/');
});
// ------------google oauth end------------//

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

app.get('/*', (req, res) => {
  // console.log(req.session);
  res.redirect('/');
});

server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
