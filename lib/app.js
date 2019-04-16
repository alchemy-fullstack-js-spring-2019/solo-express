const express = require('express');
const app = express();

// app.use((req, res, next) => {
//   console.log(`[${req.method}] ${req.url}`);
//   next('No.');
// });

app.use(express.json());
app.use('/tweets', require('./routes/tweets'));
app.use(require('./middleware/not-found'));
app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});

module.exports = app;
