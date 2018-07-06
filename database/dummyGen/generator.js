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
          locale: random.locale(),
          isMentor: random.boolean(),
        };
        user.name && saveUser(info);
      });
    })
    .catch(err => console.log(err))
}
