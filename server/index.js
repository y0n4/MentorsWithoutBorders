const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const exampleData = require("./exampleData").exampleMessages; //temp stuff
const bodyParser = require("body-parser");
const {
  TWILIO_ACCOUNT_SID,
  TWILIO_API_KEY,
  TWILIO_API_SECRET
} = require("../config.js");
const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const app = express();
const server = http.Server(app);
const io = socketIo(server);

//⬇⬇⬇ for google oauth ⬇⬇⬇
const passport = require("passport"),
  auth = require("./auth"),
  cookieParser = require("cookie-parser"),
  cookieSession = require("cookie-session");
auth(passport);
app.use(passport.initialize());
app.use(
  cookieSession({
    name: "session",
    keys: ["123"]
  })
);
app.use(cookieParser());
//⬆⬆⬆ end ⬆⬆⬆

const port = process.env.PORT || 3000;
const data = require("../database");

io.on("connection", socket => {
  socket.emit("get message", exampleData);
  socket.on("new message", message => {
    exampleData.push({
      name: "Kav",
      message: message
    });

    socket.broadcast.emit("get message", exampleData);
  });
});

app.use(express.static(__dirname + "/../client/dist"));

//------------google oauth------------//
app.get("/", (req, res) => {
  if (req.session.token) {
    res.cookie("token", req.session.token);
    res.json({
      status: "session cookie set"
    });
    console.log("user logged in!");
  } else {
    res.cookie("token", "");
    res.json({
      status: "session cookie not set"
    });
    console.log("user not yet logged in");
  }
});

//redirects client to google login page
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.profile"]
  });
);

//when user successfully logs in
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/"
  }), //back 2 home
  (req, res) => {

    var info = { //info to save into database
      googleId: req.user.profile.id,
      fullName: req.user.profile.name.givenName + ' ' + req.user.profile.name.familyName,
      gender: req.user.profile.gender
    };

    //check if user exists
    data.confirmUser(info.googleId, (err, results) => {
      if(err) {
        console.log(err);
      } else if(!results.length) {
        console.log('not in database yet, saving...');
        data.saveUser(info, (err, results) => {
          if(err) console.log('not saving correctly');
          else console.log('saved');
        });
      } else console.log("it here hunni");
    });

    req.session.token = req.user.token; //set cookies
    res.redirect("/"); //back to homepage
  }
);

app.get("/logout", (req, res) => {
  req.logout();
  req.session = null;
  res.redirect("/");
});

app.get("/*", (req, res) => {
  // console.log(req.session);
  res.redirect("/");
});
//------------google oauth end------------//

app.get("/token", (req, res) => {
  let identity = "Name Goes Here";

  // Create access token, signed and returned to client containing grant
  let token = new AccessToken(
    TWILIO_ACCOUNT_SID,
    TWILIO_API_KEY,
    TWILIO_API_SECRET
  );

  // Assign generated identity to token
  token.identity = identity;

  const grant = new VideoGrant();
  // Grant token access to the video API features
  token.addGrant(grant);

  // Serialize token to JWT string and include JSON response
  res.send({
    identity: identity,
    token: token.toJwt()
  });
});

server.listen(port, function() {
  console.log(`Listening on port: ${port}`);
});
