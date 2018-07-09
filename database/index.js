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
  socket: Sequelize.STRING,
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

const Message = sequelize.define('message', {
  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: Sequelize.DATE,
}, { timestamps: false });

const Room = sequelize.define('room', {
  name: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
  },
}, { timestamps: true, updatedAt: false });

const RoomMembers = sequelize.define('roomMembers', {}, { timestamps: false });

const MyMentor = sequelize.define('myMentor', {}, { timestamps: false });

Room.hasMany(Message);
Message.belongsTo(User);
User.belongsToMany(User, { as: 'mentor', through: 'myMentor' });
Room.belongsToMany(User, { through: RoomMembers });
User.belongsToMany(Room, { through: RoomMembers });


// sync model to database
User.sync({ force: false }).then(() => { // set true if overwite existing database
  // Table created
  console.log('User is synced');
}).catch((err) => {
  console.log('User is not synced');
});

Category.sync({ force: true }).then(() => Category.create({
  firstName: 'John',
  lastName: 'Hancock',
}));

const tableSync = [Message, Room, MyMentor, RoomMembers];
tableSync.forEach((table) => {
  table.sync({ force: false }).catch((err) => {
    console.log(`> > > ${table.name} SYNC ERROR < < <`, err);
  });
});

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

// get location information from users
const allLocation = (callback) => {
  User.findAll({ attributes: ['location'] })
    .then((userData) => {
      const locations = userData.map(user => user.dataValues.location).filter(user => user !== null);
      callback(locations);
    }).catch((err) => {
      console.log('incorrectly finding data');
    });
};

const getMyMentors = (userId, cb) => {
  MyMentor.findAll({ where: { userId } })
    .then((data) => {
      data.forEach(({ dataValues: { mentorId: id } }) => {
        User.findAll({ where: { id } })
          .then(users => cb(users));
      });
    });
};

const setMyMentor = (userId, mentorId) => {
  MyMentor.create({ userId, mentorId });
};

const setMessage = (userId, message, roomId) => {
  Message.create({ userId, message, roomId });
};

const loginUser = (userId, socket) => {
  User.findById(userId)
    .then((user) => {
      user.update({ socket });
    });
};

const logoutUser = (userId) => {
  User.findById(userId)
    .then((user) => {
      console.log(user);
      user.update('socket', 'null');
    });
};

const setRoom = (userId, mentorId) => {
  const roomName = Number(userId.toString() + mentorId.toString());

  Room.create({ name: roomName })
    .then(room => room.addUsers([userId, mentorId]))
    .catch(err => console.log(err));
};

const getRoomMessages = (roomId) => {
  Message.findAll({ where: { roomId } });
}

// const addRandomMessages = (qty = 25) => {
//   const coolKids = ['Matt', 'Yona', 'Selena', 'Kav'];
//   const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;

//   for (let i = 0; i < qty; i++) {
//     coolKids.forEach((awesomeDood) => {
//       axios.get(`http://api.icndb.com/jokes/random?escape=javascript&firstName=${awesomeDood}&lastName=`)
//         .then(({ data }) => {
//           Message.create({
//             userId: getRandomArbitrary(315, 319),
//             date: new Date(),
//             message: data.value.joke,
//             roomId: getRandomArbitrary(1, 5),
//           });
//         });
//     });
//   }
// };
// // addRandomMessages()

module.exports = {
  findUser,
  saveUser,
  allLocation,
  getMyMentors,
  setMyMentor,
  setMessage,
  loginUser,
  logoutUser,
  setRoom,
  getRoomMessages,
};
