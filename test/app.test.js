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
      .then(createdTweet => {
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

  it('can update a tweet by id', () => {
    return Tweet
      .create({ handle: 'cheri', body: 'my twit' })
      .then(createdTweet => {
        return request(app)
          .put(`/tweets/${createdTweet._id}`)
          .send({ handle: 'cheri', body: 'sweet tweet' });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'cheri',
          body: 'sweet tweet',
          _id: expect.any(String)
        });
      });
  });

  it('can delete a tweet by id', () => {
    return Tweet
      .create({ handle: 'cheri', body: 'tweet today' })
      .then(createdTweet => {
        return request(app)
          .delete(`/tweets/${createdTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          deleted: 1
        });
      });
  });

  it('can create a new tag', () => {
    return request(app)
      .post('/tags')
      .send({
        name: '#js'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: '#js', 
          _id: expect.any(String)
        });
      });
  });
});
