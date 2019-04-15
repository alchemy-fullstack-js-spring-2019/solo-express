const request = require('supertest');
const app = require('../lib/app.js');

describe('Testing chirp message board', () => {
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
});

