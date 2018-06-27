//currently mongoose will refactor l8r to a diff database like postgresql
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/global-mentors');
//mongodb uri is located in config.js file, it's connected to mlab, do l8r cuz only takes 500mb of data

//importing all schemas
var schemas = require('./schemas.js');

var db = mongoose.connection;
db.on('error', () => console.log('AWWWW, DATABASE IS NOT CONNECTED :('));
db.once('open', () => console.log('🌸 Database connected🌸 '));


//⭐️ write funcs here⭐️

//confirms if user exists in database
var confirmUser = (googleId, callback) => {
  schemas.User.find({'googleId': googleId}, (err, results) => {
    if(err) callback(err, null);
    else callback(null, results);
  });
};

//saves user to database
var saveUser = (googleId, fullName, callback) => {
  var data = {
    'googleId': googleId,
    'fullName': fullName
  }

  console.log(data);
  var newUser = new schemas.User(data);
  newUser.save((err, savedAccount) => {
    if(err) {
      console.log(err);
      callback(err, null);
    }
    else callback(null, savedAccount);
  });
};

module.exports = {
  confirmUser: confirmUser,
  saveUser: saveUser
}
