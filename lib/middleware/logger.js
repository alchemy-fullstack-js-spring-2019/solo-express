/*eslint-disable*/

module.exports = (req, res, next) => {
    const startAt = Date.now();
    console.log(`[${req.method}] ${req.url}`); //lists actions 
    res.on('finish', () => {
        const endAt = Date.now();
        console.log(`${req.method} ${req.url} [${res.statusCode}] - ${endAt - startAt}ms`)
    })

    next(); //move to next middleware
};