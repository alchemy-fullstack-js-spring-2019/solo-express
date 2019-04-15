const request = require('supertest');
const app = require('../lib/app.js');
const TweetStore = require('../models/Tweet.js');

describe('testing routes', () => {
  afterEach(() => {
    return TweetStore.drop();
  });
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

  it('returns an array of all tweet objects', () => {
    return TweetStore
      .create({ twitterHandle: 'introooomode', tweet: 'heyhi' })
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(tweetsArray => {
        expect(tweetsArray.body).toHaveLength(1);
      });
  });
  it('can get a tweet by id', () => {
    return TweetStore
      .create({ twitterHandle: 'introooomode', tweet: 'heyhi' })
      .then(createdTweet => {
        return request(app) //what exactly is this even doing? Why wouldn't it be TweetStore?
          .get(`/tweets/${createdTweet._id}`);
      })
      .then(tweet => {
        expect(tweet.body).toEqual({ 
          twitterHandle: 'introooomode',
          tweet: 'heyhi',
          _id: expect.any(String)
        });
      });
  });


});
