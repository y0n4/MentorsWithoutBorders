// currently mongoose will refactor l8r to a diff database like postgresql
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/global-mentors');
// mongodb uri is located in config.js file, it's connected to mlab, do l8r cuz only takes 500mb of data

// importing all schemas
const schemas = require('./schemas.js');

const db = mongoose.connection;
db.on('error', err => console.log('AWWWW, DATABASE IS NOT CONNECTED :(', err));
db.once('open', () => console.log('🌸 Database connected🌸 '));


// ⭐️ write funcs here⭐️

// confirms if user exists in database
const findUser = (googleId, callback) => {
  schemas.User.find({ googleId }, (err, results) => {
    console.log(googleId, 19);
    if (err) callback(err, null);
    else callback(null, results);
  });
};

// saves user to database
const saveUser = (query, callback) => {
  const newUser = new schemas.User(query);
  newUser.save((err, savedAccount) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else callback(null, savedAccount);
  });
};

module.exports = {
  findUser,
  saveUser,
};
