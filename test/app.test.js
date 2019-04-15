const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {
  it('can create a new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({
        handle: 'cara',
        text: 'my tweet'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'cara',
          text: 'my tweet',
          _id: expect.any(String)
        });
      });
  });
});

