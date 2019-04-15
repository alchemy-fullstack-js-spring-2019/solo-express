const request = require('supertest');
const app = require('../lib/app');
const mkdirp = require('mkdirp');
const Tweets = require('../lib/models/Tweet');
const Tags = require('../lib/models/Tag');

describe('tweets routes', () => {
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

  it('can update a tweet by id', () => {
    return Tweets.create({
      handle: 'leslie',
      body: 'i want to update this'
    })
      .then(createdTweet => {
        return request(app)
          .put(`/tweets/${createdTweet._id}`)
          .send({
            handle: 'leslie',
            body: 'this is now updated'
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'leslie',
          body: 'this is now updated',
          _id: expect.any(String)
        });
      });
  });

  it('can delete a tweet by id', () => {
    return Tweets.create({
      handle: 'leslie',
      body: 'going to delete this'
    })
      .then(createdTweet => {
        return request(app)
          .delete(`/tweets/${createdTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          deleted: 1
        });
      });
  });
});

describe('tags routes', () => {
  beforeAll(done => {
    mkdirp('./data/tags', done);
  });

  afterEach(() => {
    return Tags.drop();
  });

  it('can create a new tag', () => {
    return request(app)
      .post('/tags')
      .send({
        name: '#ls'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: '#ls',
          _id: expect.any(String)
        });
      });
  });

  it('can get a list of tags', () => {
    return Tags.create({
      name: '#ls'
    })
      .then(() => {
        return request(app)
          .get('/tags');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });
});
