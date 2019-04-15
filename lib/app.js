const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');

app.use((req, res, next)=> {
    const startAt = Date.now();
    res.on('finish', ()=> {
        const totalTime = Date.now() - startAt;
        console.log(`[${req.method}]${req.baseUrl} [${res.statusCode}] - ${totalTime}ms`);
    });
    next();
});

app.use(express.json());

app.use('/tweets', tweetsRoutes);

module.exports = { app };
