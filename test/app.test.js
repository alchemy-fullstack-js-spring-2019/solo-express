const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');

describe('app routes', () => {
  afterEach(() => {
    return Tweet.drop();
  });

  //CRUD
  //CREATE
  it('can create a new tweeet', () => {
    return request(app)
      .post('/tweets')
      .send({
        handle: 'human001',
        body: 'Twit twat'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'human001',
          body: 'Twit twat',
          _id : expect.any(String)
        });
      });
  });

  //GetALL
  it('can get a list of tweets', () => {
    return Tweet
      .create({ handle: 'human 002', body: 'Where lies the strangling fruit that came from the hand of the sinner' })
      .then(() => {
        return request(app)
          .get('/tweets');

      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('can get tweet by id', () => {
    return Tweet
      .create({ handle: 'ryan', body: 'my tweet' })
      .then(createdTweet => {
        return request(app)
          .get(`/tweets/${createdTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'ryan',
          body: 'my tweet',
          _id: expect.any(String)
        });
      });
  });
  
  it('can delete a tweet by id', () => {
    return request(app)
      .post('/tweets')
      .send({ handle: 'ugh', body: 'content' })
      .then(res => request(app).delete(`/tweets/${res.body._id}`))
      .then(res => {
        expect(res.body).toEqual({ deleted: 1 });
      });
  });
});
