const express = require('express');
const app = express();
const tweetsRoutes = require('./routes/tweets');
const tagsRoutes = require('./routes/tags');

app.use(express.json());
app.use((req, res, next) => {
    const startAt = Date.now();
    res.on('finish', () => {
        const endAt = Date.now();
        const responseTime = endAt - startAt + 'ms';
        console.log(req.method, req.path, req.statusCode, responseTime);
    });
    next();
});
app.use('/tweets', tweetsRoutes);
app.use('/tags', tagsRoutes);

module.exports = app;