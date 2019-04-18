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
    })

    
    //find all tags - get
        .get('/', (req, res) => {

            Tag
            .find()
            .then(tags => {
                res.send(tags);
            });
        })


    //find a tag by id
        .get('/:id', (req, res) => {
            const { id } = req.params;
            Tag
            .findById(id)
            .then(tag => {
                res.send(tag);
            });
        })

    //update a tag by id
        .put('/:id', (req, res) => {
            const { id } = req.params;
            const {
                tag
            } = req.body;
            Tag
            .findByIdAndUpdate(id, { tag })
            .then(updatedTag => {
                res.send(updatedTag);
            });
        })
    //delete a tag by id
        .delete('/:id', (req, res) => {
            const { id } = req.params;
            Tag
            .findByIdAndDelete(id)
            .then(result => {
                res.send(result);
            });
        });

