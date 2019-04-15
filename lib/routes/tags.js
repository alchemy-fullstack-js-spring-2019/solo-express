const { Router } = require('express');
const Tag = require('../models/Tag');

module.exports = Router() 
    //create a tag - post
    .post('/', (req, res) => {
        const {
            tag
        } = req.body;
        Tag
        .create({ tag })
        .then(newTag => {
            res.send(newTag);
        });
    });

    //find all tags - get


    //find a tag by id

    //update a tag by id

    //delete a tag by id


