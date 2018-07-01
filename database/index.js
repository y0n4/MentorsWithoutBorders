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
    allowNull: false,
    defaultValue: false,
  },
  isMentee: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  mentors: Sequelize.ARRAY(Sequelize.TEXT),
  mentees: Sequelize.ARRAY(Sequelize.TEXT),
  blocked: Sequelize.ARRAY(Sequelize.TEXT),
  location: Sequelize.JSON,
});
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

};

// saves user to database
const saveUser = (query, callback) => {
  // .create() combines .build() and .save()
  User
    .create(query)
    .then((user) => {
      console.log(user.get({ plain: true }));
    })
    .catch((err) => {
      console.log('not saved to database');
    });
};
