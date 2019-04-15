const express = require('express');
const app = express();
const chirpRoutes = require('../routes/chirps');

app.use(express.json());
app.use('/chirps', chirpRoutes);

module.exports = app;
