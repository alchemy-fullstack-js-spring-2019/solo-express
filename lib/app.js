const express = require('express');
const app = express();
const chirpRoutes = require('../routes/chirps');
const growlRoutes = require('../routes/growls');

app.use(express.json());

app.use(require('./middleware/logger.js'));

app.use('/chirps', chirpRoutes);
app.use('/growls', growlRoutes);

app.use(require('./middleware/notFound.js'));

module.exports = app;
