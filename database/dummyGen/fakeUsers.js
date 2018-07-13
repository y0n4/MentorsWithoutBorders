const { asyncSaveUser } = require('../index');
const axios = require('axios');
const { 
  firstNames, 
  lastNames, 
  pictures, 
  latLons,
  randomNumGen 
} = require('./fakeData');

let latLon = latLons[Math.floor(randomNumGen(0, latLons.length))];

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

async function approximateLocal() {
  let result = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLon[0]},${latLon[1]}&key=${process.env.GOOGLE_API}`);

  let city = result.data.results[1].formatted_address || null;

  if (city) {
    city = city.split(',');
    city = city[0];

    return city;
  } else {
    approximateLocal();
  }
}

async function createUsers() {
  let city = await approximateLocal();
  
  return {
    fullName: randomName(),
    gender: randomGender(Math.floor(randomNumGen(1, 2))),
    age: Math.floor(randomNumGen(18, 62)),
    photo: pictures[Math.floor(randomNumGen(0, pictures.length))],
    location: {
      latLng: latLon,
      name: city
    },
    isMentor: randomBoolean(Math.floor(randomNumGen(1, 2))),
    onlineNow: randomBoolean(Math.floor(randomNumGen(1, 2)))
  };
};


async function createUser (usersToCreate) {
  while (usersToCreate > 0) {
    let user = await createUsers();
    await asyncSaveUser(user);
    usersToCreate--;
  }
};  

module.exports = {
  createUser,
}

