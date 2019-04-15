const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');

describe('app routes', () => {

  afterEach(() =>{
    Tweet.drop();
  });

  it('create a new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({ handle: 'jared', body: 'tweety jbird' })
      .then(res => {

        expect(res.body).toEqual({ handle: 'jared', body: 'tweety jbird', _id: expect.any(String) });
      });
  });

  it('can get a list of tweets', () => {
    return Tweet
      .create({ handle: 'jared', body: 'tweety jbird' })
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('get by id', () => {
    return Tweet
      .create({ 
        handle: 'jared', 
        body: 'tweety jbird'
      })
      .then(createdTweet => {
        return request(app)
          .get(`/tweets/${createdTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ handle: 'jared', 
          body: 'tweety jbird', 
          _id: expect.any(String) 
        });
      });
  });

  it('can update a tweet by id', () => {
    return Tweet.create({ handle: 'jared', body: 'tweety jbird' })
      .then(tweet => {
        return request(app)
          .put(`/tweets/${tweet._id}`)
          .send({ 
            handle: 'jared', 
            body: 'big cheese' 
          });
      })
      .then(res => {
        expect(res.body).toEqual({ 
          handle: 'jared', 
          body: 'big cheese', 
          _id: expect.any(String) 
        });
      });
  });

  it('find by id and delete', () => {
    return Tweet.create({ handle: 'jared', body: 'big cheese' })
      .then(tweet => {
        return request(app)
          .delete(`/tweets/${tweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual(({ deleted: 1 }));
      });
  });

});
