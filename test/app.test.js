const request = require('supertest');
const app = require('../lib/app.js');

describe('testing routes', () => {
  it('can create a new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({
        twitterHandle: 'intromode',
        tweet: 'my first tweet whussuppp'
      })
      .then(res => {
        expect(res.body).toEqual({
          twitterHandle: 'intromode',
          tweet: 'my first tweet whussuppp',
          _id: expect.any(String)
        });
      });
  });
});
