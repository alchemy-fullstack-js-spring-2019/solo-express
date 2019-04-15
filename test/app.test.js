const request = require('supertest');
const app = require('../lib/app');

describe('Tweet route', () => {
  it('responds with a tweet object on POST', () => {
    return request(app)
      .post('/tweets')
      .send({ handle: 'Tommy', text: 'First tweet' })
      .then(response => {
        expect(response.body).toEqual({
          handle: 'Tommy',
          text: 'First tweet',
          _id: expect.any(String)
        });
      });
  });
});
