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

  it('find tweet by id', () => {
    return Tweet
      .create({ handle: 'Parker', twit: '√' })
      .then(newTweet => {
        return request(app)
          .get(`/tweets/${newTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'Parker',
          twit: '√',
          _id: expect.any(String)
        });
      });
  });

  it('update a tweet by id', () => {
    return Tweet
      .create({ handle: 'Parker', twit: 'put' })
      .then(newTweet => {
        return request(app)
          .put(`/tweets/${newTweet._id}`)
          .send({
            handle: 'Parker',
            twit: 'put updated twit'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'Parker',
          twit: 'put updated twit',
          _id: expect.any(String)
        });
      });
  });

});
