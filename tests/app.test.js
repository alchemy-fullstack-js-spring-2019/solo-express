const app = require('../lib/app');
const request = require('supertest');
const Tweet = require('../lib/models/Tweets');

describe('app routes', () => {
  afterEach(() => {
    return Tweet.drop();
  });

  it('can make a new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({ 
        handle: 'meg',
        body: 'whatever'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'meg',
          body: 'whatever',
          _id: expect.any(String)
        });
      });
  });
  it('can get a list of all tweets', () => {
    return Tweet
      .create({ handle: 'bob', body: 'I love tweeting' })
      .then(() => {
        return request(app)
          .get('./tweet');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });
});
