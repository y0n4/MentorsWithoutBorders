const { saveUser } = require('../index')
const { random } = require('faker');
const axios = require('axios');

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
            name: user.location.city
          },
          locale: random.locale(),
        };
        user.name && saveUser(info);
      });
    })
    .catch(err => console.log(err))
}
