const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const data = require('../database');
app.use(express.static(__dirname + '/../client/dist'));

app.listen(port, function () {
  console.log(`Listening on port: ${port}`)
})