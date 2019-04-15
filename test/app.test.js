const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {
  it('it can create a new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({
        handle: 'Mal',
        body: 'My first tweet'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'Mal',
          body: 'My first tweet',
          _id: expect.any(String)
        });
      });
  });
});
