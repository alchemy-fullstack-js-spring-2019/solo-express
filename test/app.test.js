const app = require('../lib/app');
const request = require('supertest');

describe('tweet routes', () => {
  it('creates a tweet', () => {
    return request(app)
      .post('/tweets')
      .send({ handle: 'chris', text: 'first tweet' })
      .then(receivedTweet => {
        expect(receivedTweet.body).toEqual({
          handle: 'chris',
          text: 'first tweet',
          _id: expect.any(String)
        });
      });
  });
});
