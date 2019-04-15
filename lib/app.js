const express = require('express');
const app = express();
const chirpRoutes = require('../routes/chirps');
const growlRoutes = require('../routes/growls');

app.use(express.json());

app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(req.method, req.path, `[${res.statusCode}]`);
  });
  next();
});

app.use('/chirps', chirpRoutes);
app.use('/growls', growlRoutes);

app.use(require('./middleware/notFound.js'));

module.exports = app;
