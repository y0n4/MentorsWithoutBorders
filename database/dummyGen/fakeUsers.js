const { asyncSaveUser } = require('../index');
const axios = require('axios');
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
 
async function approximateLocal() {
  let latLon = latLons[Math.floor(randomNumGen(0, latLons.length))];
  let result = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLon[0]},${latLon[1]}&key=${process.env.GOOGLE_API}`).catch((err) => {
    console.log('There was an error in the Google Map', err)
  })
  let quote = await axios({
        method: 'get',
        url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous&count=1',
        headers: {
        'X-Mashape-Key': 'czGDnXNx1gmshgfCx4vYASFY9Bnsp1ksXifjsnIGGtctpIGWtU'
        } 
      });

  quote = quote.data[0].quote;
  let city = result.data.results[1].formatted_address || null;

  if (city) {
    city = city.split(',');
    city = city[0];

    return {
      city,
      quote,
      latLon
    };
  } else {
    approximateLocal();
  }
}  

async function createUsers() {
  let cityAndQuote = await approximateLocal();
  let city = cityAndQuote.city;
  let quote = cityAndQuote.quote;
  quote = quote.split(' ');
  quote = quote.length >= 10 ? quote.slice(0, 10) : quote;
  quote = `${quote.join(' ')}...`;
  let latLon = cityAndQuote.latLon
  
  return {
    fullName: randomName(),
    gender: randomGender(Math.floor(randomNumGen(1, 2))),
    age: Math.floor(randomNumGen(18, 62)),
    photo: pictures[Math.floor(randomNumGen(0, pictures.length))],
    aQuote: quote,
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
    // console.log('This is the user', user)
    await asyncSaveUser(user);
    usersToCreate--;
  }
};  

module.exports = {
  createUser,
}

