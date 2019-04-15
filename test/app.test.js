const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {
  it('can create a new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({
        handle: 'cheri', 
        body: 'first tweet in my app'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'cheri',
          body: 'first tweet in my app', 
          _id: expect.any(String)
        });
      });
  });
});
