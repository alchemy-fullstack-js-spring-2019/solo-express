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
});
