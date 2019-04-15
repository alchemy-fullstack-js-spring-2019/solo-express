const app = require('../lib/app');
const request = require('supertest');
const Tweet = require('../lib/models/Tweet');

describe('tweet routes', () => {

  afterEach(() => {
    Tweet.drop();
  });

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
  
  it('reads a tweet with id', () => {
    return Tweet
      .create({ handle: 'tester', text: 'get test' })
      .then(createdTweet => {
        return request(app)
          .get(`/tweets/${createdTweet._id}`);
      })
      .then(receivedTweet => {
        expect(receivedTweet.body).toEqual({
          handle: 'tester',
          text: 'get test',
          _id: expect.any(String)
        });
      });
  });
  
  it('reads all tweets', () => {
    return Tweet
      .create({ handle: 'tester', text: 'get test' })
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(receivedTweets => {
        expect(receivedTweets.body).toHaveLength(1);
      });
  });

});
