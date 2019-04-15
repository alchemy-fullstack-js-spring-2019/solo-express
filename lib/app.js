const express = require('express');
const app = express();
const createdTweet = require('../lib/routes/tweets');
const animalCreator = require('../lib/routes/animals');

app.use((request, response, next) => {
    console.log('running some middleware here');
    response.on('finish', () => {
        console.log(`[${request.method}] ${request.baseUrl} [${response.statusCode}]`);
    });
    next();
});

app.use(express.json());
app.use('/tweets', createdTweet);
app.use('/animals', animalCreator);

app.use((err, request, response, next) => {
    console.log('Youre in error Town now');
    response.status(400).send({ error: err });
});
module.exports = app;
