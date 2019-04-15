const app = require('../lib/app');
const request = require('supertest');
const Tweet = require('../lib/models/Tweet');
const Tag = require('../lib/models/Tag');

describe('app routes', () => {
  afterEach(() => {
    return Tweet.drop(); // .DROPS!
  });

  //it's CRUD
  it('can return a new tweet', () => {
    return request(app)
      .post('/tweets') // update at the url route
      .send({ // send json object (the tweet)
        handle: 'chris',
        body: 'my first tweet'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'chris',
          body: 'my first tweet',
          _id: expect.any(String) //<- magic
        });
      });
  });

  it('can get a list of tweets', () => {
    return Tweet
      .create({ handle: 'chris', body: 'my tweet' })
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('can get a tweet by id', () => {
    return Tweet
      .create({ handle: 'chris', body: 'my tweet' })
      .then(createdTweet => {
        return request(app)
          .get(`/tweets/${createdTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'chris',
          body: 'my tweet',
          _id: expect.any(String)
        });
      });
  });

  it('can update a tweet by id', () => {
    return Tweet.create({ handle: 'chris', body: 'my tweet' })
      .then(tweet => {
        return request(app)
          .put(`/tweets/${tweet._id}`)
          .send({
            handle: 'chris',
            body: 'my new tweet'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'chris',
          body: 'my new tweet',
          _id: expect.any(String)
        });
      });
  });

  it('can delete a tweet by id', () => {
    return Tweet.create({ handle: 'chris', body: 'delete this tweet' })
      .then(tweet => {
        return request(app)
          .delete(`/tweets/${tweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          deleted: 1
        });
      });
  });
});

describe('tags resource', () => {
  afterEach(() => {
    return Tag.drop();
  });

  it('can return a new tag', () => {
    return request(app)
      .post('/tags')
      .send({
        name: 'recreation'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'recreation',
          _id: expect.any(String)
        });
      });
  });

  it('can get a list of tags', () => {
    return Tag
      .create({ name: 'work' })
      .then(() => {
        return request(app)
          .get('/tags');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('can get a tag by id', () => {
    return Tag
      .create({ name: 'YouGotMeByMyId!', _id: 'mockID' })
      .then(createdTag => {
        return request(app)
          .get(`/tags/${createdTag._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'YouGotMeByMyId!',
          _id: expect.any(String)
        });
      });
  });

});

