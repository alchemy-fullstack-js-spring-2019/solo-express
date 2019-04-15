const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');
const tagsRoutes = require('./routes/tags');

app.use(express.json());
app.use((req, res, next) => {
    console.log(`Method is ${req.method}`);
    console.log(`Pathname is ${req.path}`);
    next();
});
app.use('/tweets', tweetsRoutes);
app.use('/tags', tagsRoutes);

module.exports = app;