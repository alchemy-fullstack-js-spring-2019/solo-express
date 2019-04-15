const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {
  it('can create a tweet', () => {
    return request(app)
      .post('./tweets')
      .send({
        handle: 'gilagamesh',
        body: 'enkidu ?'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'gilagamesh',
          body: 'enkidu ?',
          _id: expect.any(String)
        });
      });
  });
});
