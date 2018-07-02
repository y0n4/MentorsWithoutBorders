const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://localhost:8080/globalmentors');

sequelize
  .authenticate()
  .then(() => {
    console.log('🔥 🔥 database connected🔥 🔥');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// model represents a table in database
const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  googleId: Sequelize.STRING,
  fullName: Sequelize.STRING,
  gender: Sequelize.STRING,
  ratings: Sequelize.INTEGER,
  totalRatings: Sequelize.INTEGER,
  bio: Sequelize.STRING,
  isMentor: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isMentee: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  mentors: Sequelize.ARRAY(Sequelize.TEXT),
  mentees: Sequelize.ARRAY(Sequelize.TEXT),
  blocked: Sequelize.ARRAY(Sequelize.TEXT),
  location: Sequelize.JSON,
},   {timestamps: false});
// can also write getterMethods and setterMethods, useful?(http://docs.sequelizejs.com/manual/tutorial/models-definition.html#getters-setters)
// future plans: import all model definitions from another file

// sync model to database
User.sync({ force: true }).then(() => {
  // Table created
  console.log('model is synced');
}).catch((err) => {
  console.log('model is not synced');
});

// confirm if user exists in database
const findUser = (googleId, callback) => {
  User.findOne({
    where: {googleId: googleId}
  }).then((user) => {
    console.log('user', user.dataValues);
    callback(user);
  }).catch((err) => {
    console.log(err, 'ERROR');
  });
};

// saves user to database
const saveUser = (query) => {
  // .create() combines .build() and .save()
  User.create(query).then((user) => {
    console.log(user.get({ plain: true }));
  }).catch((err) => {
    console.log('not saved to database');
  });
};

module.exports = {
  findUser,
  saveUser,
};