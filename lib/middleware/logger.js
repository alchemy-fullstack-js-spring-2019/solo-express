/*eslint-disable*/
const app = require('../app');

app.listen(7890)
module.exports = (req, res, next) => {
    console.log(`[${req.method}] ${req.url}`); //lists actions 
    console.log(`pathname: ${req.pathname}`);
    req.on('finish', () => {
        console.log(`${req.method} ${req.pathname} [${res.body.status}]`)
    })

    next(); //move to next middleware
};