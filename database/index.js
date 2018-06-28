//currently mongoose will refactor l8r to a diff database like postgresql
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
//mongodb uri is located in config.js file, it's connected to mlab, do l8r cuz only takes 500mb of data

//importing all schemas
var schemas = require('./schemas.js');

var db = mongoose.connection;
db.on('error', (err) => console.log('AWWWW, DATABASE IS NOT CONNECTED :(', err));
db.once('open', () => console.log('🌸 Database connected🌸 '));


//⭐️ write funcs here⭐️

//confirms if user exists in database
var findUser = (googleId, callback) => {
  schemas.User.find({'googleId': googleId}, (err, results) => {
    console.log(googleId, 19)
    if(err) callback(err, null);
    else callback(null, results);
  });
};

//saves user to database
var saveUser = (query, callback) => {
  var newUser = new schemas.User(query);
  newUser.save((err, savedAccount) => {
    if(err) {
      console.log(err);
      callback(err, null);
    }
    else callback(null, savedAccount);
  });
};

module.exports = {
  findUser: findUser,
  saveUser: saveUser
}
