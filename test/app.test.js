const request = require('supertest');
const app = require('../lib/app.js');
const Chirps = require('../models/Chirps');

describe('Testing chirp message board', () => {
  afterEach(() => {
    return Chirps.drop();
  });
  it('creates chirp and returns chirp object', () => {
    return request(app)
      .post('/chirps')
      .send({
        handle: 'robyn',
        body: 'poo-tee-weet'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'robyn',
          body: 'poo-tee-weet',
          _id: expect.any(String)
        });
      });
  });

  it('gets a list of all chirps', () => {
    return Chirps.create({ handle: 'Mocky', body: 'tee-doh-tee' })
      .then(() => {
        return request(app)
          .get('/chirps');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });
});

