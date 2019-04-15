const express = require('express');
const app = express();
const chirpRoutes = require('../routes/chirps');
const growlRoutes = require('../routes/growls');

app.use(express.json());
app.use('/chirps', chirpRoutes);
app.use('/growls', growlRoutes);

module.exports = app;
