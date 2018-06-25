//to use mongoose will refactor l8r to a diff database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/global-mentors');
//mongodb uri is located in config.js file, it's connected to mlab, do l8r cuz only takes 500mb of data