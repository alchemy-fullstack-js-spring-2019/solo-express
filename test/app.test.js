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
      .create({ handle: 'cheri', body: 'my tweet' })
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('can get a tweet by the id', () => {
    return Tweet 
      .create({ handle: 'cheri', body: 'my tweet' })
      .then(createdTweet=> {
        return request(app)
          .get(`/tweets/${createdTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'cheri',
          body: 'my tweet',
          _id: expect.any(String)
        });
      });
  });
});
