const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    console.log('response sent to client');
    res.end('response sent');
});

module.exports = app;