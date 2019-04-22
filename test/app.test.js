const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet.js');

describe('router test', () => {
  afterEach(() => {
    return Tweet.drop();
  });
  it('posts a tweet', () => {
    return request(app)
      .post('/tweets')
      .send({
        handle: 'cosmo', 
        body: 'this is a tweet I am testing'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'cosmo', 
          body: 'this is a tweet I am testing',
          _id: expect.any(String)
        });
      });
  });

  it('gets a list of all tweets', () => {
    return Tweet
      .create({
        handle: 'cosmo',
        body: 'I am simulating a tweet'
      })
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('gets a tweet by id', () => {
    return Tweet
      .create({
        handle: 'cosmo',
        body: 'this is a test to find by id'
      })
      .then(tweet => {
        return request(app)
          .get(`/tweets/${tweet._id}`);
      })
      .then(res => {
        return expect(res.body).toEqual({
          handle: 'cosmo', 
          body: 'this is a test to find by id',
          _id: expect.any(String)
        });
      });
  });

  it('gets a tweet by id and updates', () => {
    return Tweet
      .create({
        handle: 'cosmo',
        body: 'I am testing find by id and update'
      })
      .then(createdTweet => {
        return request(app)
          .put(`/tweets/${createdTweet._id}`)
          .send({
            handle: 'cosmo',
            body: 'this is the updated tweet'
          })
          .then(res => {
            console.log(res.body);
            expect(res.body).toEqual({
              handle: 'cosmo',
              body: 'this is the updated tweet',
              _id: expect.any(String)
            });
          });
      });
  });
  
  it('deletes an entry from the database', () => {
    return Tweet.create({
      handle: 'cosmo',
      body: 'this is a tweet to be deleted'
    })
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
});
