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
        handle: 'ryan',
        body: 'my first tweet'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'ryan',
          body: 'my first tweet',
          _id: expect.any(String)
        });
      });
  });
  it('gets a list of tweets', () => {
    return Tweet
      .create({ handle: 'dave', body: 'a tweet' })
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('can get a tweet by id', () => {
    return Tweet
      .create({ handle: 'dave', body: 'a tweet' })
      .then(createdTweet => {
        return request(app)
          .get(`/tweets/${createdTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'dave',
          body: 'a tweet',
          _id: expect.any(String)
        });
      });
  });

  it('updates a tweet by the id', () => {
    return Tweet.create({ handle: 'dave', body: 'a good tweet' })
      .then(tweet => {
        return request(app)
          .put(`/tweets/${tweet._id}`)
          .send({
            handle: 'dave',
            body: 'a good tweet'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'dave',
          body: 'a good tweet',
          _id: expect.any(String)
        });
      });
  });

  it('deletes a tweet by the id', () => {
    return Tweet.create({ handle: 'dave', body: 'a tweet' })
      .then(tweet => {
        return request(app)
          .delete(`/tweets/${tweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          deleted: 1
        });
      });
  });
});
