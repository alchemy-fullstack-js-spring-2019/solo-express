const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');

describe('app routes', () => {
  afterEach(() => {
    return Tweet.drop();
  });

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

  it('can get a list of tweets', () => {
    return Tweet
      .create({ handle: 'ryan', body: 'my tweet' })
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });
});
