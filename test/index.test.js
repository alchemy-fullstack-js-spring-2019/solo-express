const request = require('supertest');
const app = require('../lib/app');

describe('ROUTE TESTS', () => {
  it('posts new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({
        handle: 'Parker',
        body: 'I twitted'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'Parker',
          body: 'I twitted',
          _id: expect.any(String)
        });
      });
  });
});
