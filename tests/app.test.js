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
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });
  it('can find a tweet by id', () => {
    return Tweet
      .create({ handle: 'bob', body: 'my cool tweet' })
      .then((createdTweet) => {
        return request(app)
          .get(`/tweets/${createdTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'bob',
          body: 'my cool tweet',
          _id: expect.any(String)
        });
      });
  });
  it('can find a tweet by id and update', () => {
    return Tweet  
      .create({ handle: 'dignan', tweet: 'you know there\'s nothing to steal from my mom and craig' })
      .then((createdTweet) => {
        return request(app)
          .put(`/tweets/${createdTweet._id}`)
          .send({ 
            handle: 'dignan',
            body: 'bob maplethorpe, potential getaway driver, go!'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'dignan',
          body: 'bob maplethorpe, potential getaway driver, go!',
          _id: expect.any(String)
        });
      });
  });
});
