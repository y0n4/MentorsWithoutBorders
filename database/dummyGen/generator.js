const { random } = require('faker');
const axios = require('axios');
const { saveUser } = require('..');
const { Message } = require('..');

module.exports.addDataToHeroku = (qty = 100) => {
  axios.get(`https://randomuser.me/api/?results=${qty}`)
    .then(({ data }) => {
      data.results.forEach((user) => {
        const info = {
          fullName: `${user.name.first} ${user.name.last}`,
          gender: user.gender,
          photo: user.picture.thumbnail,
          isMentor: random.boolean(),
          location: {
            latLng: [Number(user.location.coordinates.latitude), Number(user.location.coordinates.longitude)],
            name: user.location.city,
          },
          locale: random.locale(),
        };
        user.name && saveUser(info);
      });
    })
    .catch(err => console.log(err));
};


module.exports.addRandomMessages = (qty = 25) => {
  const coolKids = ['Matt', 'Yona', 'Selena', 'Kav'];
  const getRandomArbitrary = (min, max) => Math.random() * (max - min) + min;

  for (let i = 0; i < qty; i++) {
    coolKids.forEach((awesomeDood) => {
      axios.get(`http://api.icndb.com/jokes/random?escape=javascript&firstName=${awesomeDood}&lastName=`)
        .then(({ data }) => {
          Message.create({
            userId: getRandomArbitrary(315, 319),
            date: new Date(),
            message: data.value.joke,
            roomId: getRandomArbitrary(1, 5),
          });
        });
    });
  }
};

const messagesAPI = () => {
  let quotes = [];

  while (quotes.length < 10) {
    axios({
      method: 'get',
      url: 'https://ajith-messages.p.mashape.com/getMsgs?category=random', 
      headers: {
      'X-Mashape-Key': 'czGDnXNx1gmshgfCx4vYASFY9Bnsp1ksXifjsnIGGtctpIGWtU'
      }
    }).then((results) => {
      console.log('Results from messages', results);
    }).catch((err) => {
      console.log('Err from results', err);
    })
  }

  return quotes;
};
