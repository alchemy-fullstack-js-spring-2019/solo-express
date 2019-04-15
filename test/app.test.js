const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet.js');
const Tags = require('../lib/models/Tags.js');

describe('tweet factory', () => {

  afterEach(() => {
    return Tweet.drop();
  });

  it('posts tweets using POST', () => {
    return request(app)
      .post('/tweets')
      .send({
        name: 'Sean',
        tweet: 'Wow this is confusing'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Sean',
          tweet: 'Wow this is confusing',
          _id: expect.any(String)
        });
      });
  });

  it('can get a list of tweets', () => {
    Tweet.create({ name: 'Sean', tweet: 'something controversial' })
      .then(() => {
        return request(app)
          .get('/tweets');
      })

      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('can get a single tweet', () => {
    return Tweet
      .create({ name: 'Nelson', tweet: 'dood' })
      .then(createdTweet => {
        return request(app)
          .get(`/tweets/${createdTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Nelson',
          tweet: 'dood',
          _id: expect.any(String)
        });
      });
  });

  it('can update a tweet', () => {
    return Tweet
      .create({ name: 'Nelson', tweet: 'dood' })
      .then(toUpdate => {
        return request(app)
          .put(`/tweets/${toUpdate._id}`)
          .send({
            name: 'updatedName',
            tweet: 'dood'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'updatedName',
          _id: expect.any(String)
        });
      });
  });  

  it('can delete a tweet', () => {
    return Tweet
      .create({ name: 'Nelson', tweet: 'dood' })
      .then(tweet => {
        return request(app)
          .delete(`/tweets/${tweet._id}`);
      })
      .then(result => {
        expect(result.body).toEqual({ deleted: 1 });
      });
  });
});


describe('tag factory', () => {
  afterEach(() => {
    return Tags.drop();
  });

  it('creates tag', () => {
    return request(app)
      .post('/tags')
      .send({ name: 'Todd' })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Todd',
          _id: expect.any(String)
        });
      });

  });

  it('gets list of tags', () => {
    return Tags.create({ name: 'dude' })
      .then(() => {
        return request(app)
          .get('/tags');
      })
      .then(result => {
        expect(result.body).toHaveLength(1);
      });
  });

  it('find tag by ID', () => {
    return Tags.create({ name: 'brad' })
      .then(created => {
        return request(app)
          .get(`/tags/${created._id}`);
      })
      .then(result => {
        expect(result.body).toEqual({
          name: 'brad',
          _id: expect.any(String)
        });
      });
  });

  it('updates a tag', () => {
    return Tags.create({ name: 'san' })
      .then(oops => {
        return request(app)
          .put(`/tags/${oops._id}`)
          .send({ name: 'sean' });
      })
      .then(result => {
        expect(result.body).toEqual({
          name: 'sean',
          _id: expect.any(String)
        });
      });

  });

  it('deletes a tag', () => {
    return Tags.create({ name: 'delete me' })
      .then(toDelete => {
        return request(app)
          .delete(`/tags/${toDelete._id}`);
      })
      .then(result => {
        expect(result.body).toEqual({ deleted: 1 });
      });
  });
});

