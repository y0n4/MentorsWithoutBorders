const pg = require('pg');

pg.defaults.ssl = true;
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_URI);

sequelize
  .authenticate()
  .then(() => {
    console.log('🔥 🔥 Database Connected🔥 🔥');
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
  photo: Sequelize.STRING,
  gender: Sequelize.STRING,
  ratings: Sequelize.INTEGER,
  totalRatings: Sequelize.INTEGER,
  bio: Sequelize.STRING,
  isMentor: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  mentors: Sequelize.ARRAY(Sequelize.TEXT),
  mentees: Sequelize.ARRAY(Sequelize.TEXT),
  blocked: Sequelize.ARRAY(Sequelize.TEXT),
  location: Sequelize.JSON,
  locale: Sequelize.STRING,
}, { timestamps: false });

// category table is not being used atm (will need to have some fields already saved in it automatically, this is not meant for users to submit a field profession (only for our use))
const Category = sequelize.define('category', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  category: Sequelize.STRING,
}, { timestamps: false });
// can also write getterMethods and setterMethods, useful?(http://docs.sequelizejs.com/manual/tutorial/models-definition.html#getters-setters)
// future plans: import all model definitions from another file

// sync model to database
User.sync({ force: false }).then(() => { // set true if overwite existing database
  // Table created
  console.log('model is synced');
}).catch((err) => {
  console.log('model is not synced');
});

Category.sync({ force: true }).then(() => 
  // Table created
  return Category.create({
    firstName: 'John',
    lastName: 'Hancock'
  })
);

// confirm if user exists in database
const findUser = (googleId, callback) => {
  User.findOne({
    where: { googleId },
  }).then((user) => {
    // console.log('user', user);
    callback(user);
  }).catch((err) => {
    console.log(err, 'ERROR');
  });
};

// saves user to database
const saveUser = (query) => {
  // .create() combines .build() and .save()
  User.create(query).then((user) => {
    console.log(query.fullName, 'is saved to db');
  }).catch((err) => {
    console.log('not saved to database');
  });
};

module.exports = {
  findUser,
  saveUser,
};
