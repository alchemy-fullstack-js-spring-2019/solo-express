const app = require('../lib/app');
const request = require('supertest');

describe('app routes', () => {
  it('can make a new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({ 
        handle: 'meg',
        body: 'whatever'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'meg',
          body: 'whatever',
          _id: expect.any(String)
        });
      });
  });
});
