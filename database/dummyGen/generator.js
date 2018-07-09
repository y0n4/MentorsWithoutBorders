const { random } = require('faker');
const axios = require('axios');
const { saveUser } = require('../index');
const { Message } = require('../index');

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
  const addMessage = () => {
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
  };

  for (let i = 0; i < qty; i += 1) {
    addMessage();
  }
};
