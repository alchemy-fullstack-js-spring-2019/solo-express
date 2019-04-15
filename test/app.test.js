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
        handle: 'cara',
        text: 'my tweet'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'cara',
          text: 'my tweet',
          _id: expect.any(String)
        });
      });
  });

  it('can return all tweets', () => {
    return request(app)
      .get('/tweets')
      .then(res => {
        expect(res.body).toEqual([]);
      });
  });

  it('can get a tweet by id', () => {
    return request(app)
      .post('/tweets')
      .send({
        handle: 'test',
        text: 'test'
      })
      .then(tweet => {
        return request(app)
          .get(`/tweets/${tweet.body._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'test',
          text: 'test',
          _id: expect.any(String)
        });
      });
  });

  it('can find a tweet by id and update', () => {
    return request(app)
      .post('/tweets')
      .send({
        handle: 'test',
        text: 'test'
      })
      .then(tweet => {
        return request(app)
          .put(`/tweets/${tweet.body._id}`).send({ handle: 'dog' })
          .then(res => {
            expect(res.body.handle).toEqual('dog');
          });
      });
  });
});

