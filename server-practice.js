const express = require('express');

const app = express();

app.listen(7890);

app.get('/hello', (req, res) => {
  res.send('hi');
  res.end();
});

