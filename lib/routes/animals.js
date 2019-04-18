const { Router } = require('express');
const Animal = require('../models/Animals');

module.exports = Router()
    .post('/', (request, response) => {
        const {
            species,
            legs
        } = request.body;

        Animal
            .create({ species, legs })
            .then(newAnimal => {
                response.send(newAnimal);
            });
    })
    .get('/', (request, response) => {
        Animal
            .find()
            .then(allAnimals => {
                response.send(allAnimals);
            });
    })
    .get('/:id', (request, response) => {
        const { id } = request.params;
        console.log(id);
        Animal
            .findById(id)
            .then(foundAnimal => {
                response.send(foundAnimal);
            });
    })
    .put('/:id', (request, response) => {
        const { id } = request.params;
        const {
            species,
            legs
        } = request.body;

        Animal
            .findByIdAndUpdate(id, { species, legs })
            .then(updatedAnimal => {
                response.send(updatedAnimal);
            });
    })
    .delete('/:id', (request, response) => {
        const { id } = request.params;
        Animal
            .findByIdAndDelete(id)
            .then(result => response.send(result));
    });
