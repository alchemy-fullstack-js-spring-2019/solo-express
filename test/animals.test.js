const request = require('supertest');
const app = require('../lib/app');
const Animal = require('../lib/models/Animals');
const mkdirp = require('mkdirp');

describe('animal routes', () => {
    beforeAll(done => {
        mkdirp('./data/tweets', done);
    });
    afterEach(() => {
        return Animal.drop();
    });
    it('creates a new animal', () => {
        return request(app)
            .post('/animals')
            .send({
                species: 'giraffe',
                legs: 4
            })
            .then(response => {
                expect(response.body).toEqual({
                    species: 'giraffe',
                    legs: 4,
                    _id: expect.any(String)
                });
            });
    });
    it('returns all animals', () => {
        return Animal.create({ species: 'lion', legs: 12 })
            .then(() => {
                return request(app)
                    .get('/animals')
                    .then(response => {
                        expect(response.body).toHaveLength(1);
                    });
            });
    });
    it('finds an animal by id', () => {
        return Animal.create({ species: 'walrus', legs: 20 })
            .then(createdAnimal => {
                return request(app)
                    .get(`/animals/${createdAnimal._id}`)
                    .then(response => {
                        expect(response.body).toEqual({
                            species: 'walrus',
                            legs: 20,
                            _id: expect.any(String)
                        });
                    });
            });
    });
    it('finds an animal by id and updates', () => {
        return Animal.create({ species: 'Leopard', legs: 50 })
            .then(createdAnimal => {
                return request(app)
                    .put(`/animals/${createdAnimal._id}`)
                    .send({
                        species: 'Updated Species',
                        legs: 50
                    });
            })
            .then(response => {
                console.log(response.body)
                expect(response.body).toEqual({
                    species: 'Updated Species',
                    legs: 50,
                    _id: expect.any(String)
                });
            });
    });
    it('deletes an animal', () => {
        return Animal.create({ species: 'Bull', legs: 30 })
            .then(animal => {
                return request(app)
                    .delete(`/animals/${animal._id}`);
            })
            .then(response => {
                expect(response.body).toEqual({
                    deleted: 1
                });
            });
    });
});
