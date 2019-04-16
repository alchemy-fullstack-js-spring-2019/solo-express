const { Router } = require('express');
const Tag = require('../models/Tag');

// Let's add tags as another resource.

// * create a `lib/models/Tag.js` file
//   * export a `Store` instance
// * create a `lib/routes/tags.js` file
//   * create a new router `require('express').Router()`
//   * tags look like `{ name: '#js', _id: '1234' }`
//   * create all CRUD routes
//     * `POST /tags`
//     * `GET /tags`
//     * `GET /tags/:id`
//     * `PUT /tags/:id`
//     * `DELETE /tags/:id`
// * inside `lib/app.js`
//   * `require('./routes/tags')`
//   * `use` the tweets route with `app.use`
module.exports = Router()
    .post('/', (req, res) => {
        const {
            name
        } = req.body;

        Tag
            .create({ name })
            .then(createdTag => {
                res.send(createdTag);
            });
    });
