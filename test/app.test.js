const req = require('http');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');


describe('it responds to app routes', () => {
  afterEach(() => {
    return Tweet.drop();
  });

  // CRUD PROCESSES
  it('can create a new tweet', () => {
    return req(app)
      .post('/tweets')
      .send({
        handle: 'laura',
        body: 'i\'m a twit'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'laura', 
          body: 'i\'m a twit',
          _id: expect.any(String)
        });
      });
  });
  it('can get a list of tweets', () => {
    return Tweet
      .create({ handle: 'laura', body: 'i\'m a twit' })
      .then(() => {
        return req(app)
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('can get a tweet by id', () => {
    return Tweet
      .create({ handle: 'laura', body: 'i\'m a twit' })
      .then(createdTweet => {
        return req(app)
          .get(`/tweets/${createdTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'laura',
          body: 'a twit',
          _id: expect.any(String)
        });
      });
  });

  it('can update a tweet by id', () => {
    return Tweet.create({ handle: 'laura', body: 'i\'m a twit' })
      .then(tweet => {
        return req(app)
          .put(`/tweets/${tweet._id}`)
          .send({
            handle: 'laura',
            body: 'the good tweet'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'ryan',
          body: 'the good tweet',
          _id: expect.any(String)
        });
      });
  });

  it('can delete a tweet by id', () => {
    return Tweet.create({ handle: 'laura', body: 'the tweetiest tweet' })
      .then(tweet => {
        return req(app)
          .delete(`/tweets/${tweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          deleted: 1
        });
      });
  });
});
