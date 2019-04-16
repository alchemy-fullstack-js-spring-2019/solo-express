const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');

describe('app routes', () => {
  // afterEach(() => {
  //   return Tweet.drop();
  // });

  // C R U D
  it('can create a new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({
        handle: 'emily',
        body: 'testing'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'emily',
          body: 'testing',
          _id: expect.any(String)
        });
      });
  });

  // it('can get a list of tweets', () => {
  //   return Tweet
  //     .create({ handle: 'emily', body: 'another test' })
  //     .then(() => {
  //       return request(app)
  //         .get('/tweets');
  //     })
  //     .then(res => {
  //       expect(res.body).toHaveLength(1);
  //     });
  // });

  // it('can get a tweet by id', () => {
  //   return Tweet
  //     .create({ handle: 'emily', body: 'wow, another test' })
  //     .then(createdTweet => {
  //       return request(app)
  //         .get(`/tweets/${createdTweet._id}`);
  //     })
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         handle: 'emily',
  //         body: 'wow, another test',
  //         _id: expect.any(String)
  //       });
  //     });
  // });

  // it('can updated a tweet by id', () => {
  //   return Tweet.create({ handle: 'emily', body: 'yet another test' })
  //     .then(tweet => {
  //       return request(app)
  //         .put(`/tweets/${tweet._id}`)
  //         .send({
  //           handle: 'emily',
  //           body: 'yet another test'
  //         });
  //     })
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         handle: 'emily',
  //         body: 'yet another test',
  //         _id: expect.any(String)
  //       });
  //     });
  // });

  // it('can delete a tweet by id', () => {
  //   return Tweet.create({ handle: 'emily', body: 'tests forever' })
  //     .then(tweet => {
  //       return request(app)
  //         .delete(`/tweets/${tweet._id}`);
  //     })
  //     .then(res => {
  //       expect(res.body).toEqual({
  //         deleted: 1
  //       });
  //     });
  // });
});
