const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  // this sets the header to content-type json
  res.send({ name: 'Mal' });
  // res.send or res.json() they mean the same thing

  //res.end is used for text
});

module.exports = app;
