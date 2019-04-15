const express = require('express');

const app = express();
app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.listen(7890, () => {
  console.log('started on port 7890');
});