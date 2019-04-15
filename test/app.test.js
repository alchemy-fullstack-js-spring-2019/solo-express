const request = require('supertest');
const app = require('../lib/app');
const mkdirp = require('mkdirp');
const Tweets = require('../lib/models/Tweets');

describe('app routes', () => {
  beforeAll(done => {
    mkdirp('./data/tweets', done);
  });

  afterEach(() => {
    return Tweets.drop();
  });

  it('can create a new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({
        handle: 'leslie',
        body: 'this is my first tweet'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'leslie',
          body: 'this is my first tweet',
          _id: expect.any(String)
        });
      });
  });

  it('can get a list of tweets', () => {
    return Tweets.create({
      handle: 'leslie',
      body: 'another tweet'
    })
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('can get a tweet by id', () => {
    return Tweets.create({
      handle:'leslie',
      body: 'anotha one'
    })
      .then(createdTweet => {
        return request(app)
          .get(`/tweets/${createdTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'leslie',
          body: 'anotha one',
          _id: expect.any(String)
        });
      });
  });
});
