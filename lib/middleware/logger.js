/*eslint-disable*/

module.exports = (req, res, next) => {
    console.log(`[${req.method}] ${req.url}`); //lists actions 
    res.on('finish', () => {
        console.log(`${req.method} ${req.url} [${res.statusCode}]`)
    })

    next(); //move to next middleware
};