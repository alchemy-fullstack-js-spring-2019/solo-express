const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');

describe('ROUTE TESTS', () => {

  afterEach(() => {
    return Tweet.drop();
  });

  it('posts new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({
        handle: 'Parker',
        twit: 'I twitted'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'Parker',
          twit: 'I twitted',
          _id: expect.any(String)
        });
      });
  });

  it('get a list of tweets', () => {
    return Tweet
      .create({ handle: 'Parker', twit: 'do it √' })
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

});
