const { asyncSaveUser } = require('../index');
const { 
  firstNames, 
  lastNames, 
  pictures, 
  latLons,
  randomNumGen 
} = require('./fakeData');

let randomName = () => {
  let firstName = firstNames[Math.floor(randomNumGen(0, firstNames.length))];
  let lastName = lastNames[Math.floor(randomNumGen(0, lastNames.length))];

  return `${firstName} ${lastName}`;
};

let randomGender = (num) => {
  return (num === 1) ? 'male' : 'female';
};

let randomBoolean = (num) => {
  return (num === 1) ? true : false;
};


let createUsers = () => {
  return query = {
    fullName: randomName(),
    gender: randomGender(Math.floor(randomNumGen(1, 2))),
    photo: pictures[Math.floor(randomNumGen(0, pictures.length))],
    location: latLons[Math.floor(randomNumGen(0, latLons.length))],
    isMentor: randomBoolean(Math.floor(randomNumGen(1, 2))),
    onlineNow: randomBoolean(Math.floor(randomNumGen(1, 2)))
  };
};

async function createUser (usersToCreate) {
  while (usersToCreate > 0) {
    let user = createUsers();
    let result = await asyncSaveUser(user);
    usersToCreate--;
  }
};


module.exports = {
  createUser,
}

