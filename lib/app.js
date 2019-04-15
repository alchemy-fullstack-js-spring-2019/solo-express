const express = require('express');
const app = express();
const tweets = require('./routes/tweets');

app.use(express.bodyParser());
app.use('/tweets', tweets);



