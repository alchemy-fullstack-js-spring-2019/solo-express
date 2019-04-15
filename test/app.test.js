const app = require('../lib/app');
const request = require('supertest');
const Tweet = require('../lib/models/Tweet');
const Tag = require('../lib/models/Tag');

describe('tag routes', () => {
  
  afterEach(() => {
    Tag.drop();
  });

  it('creates a tag', () => {
    return request(app)
      .post('/tags')
      .send({ name: '#test' })
      .then(res => {
        expect(res.body).toEqual({
          name: '#test',
          _id: expect.any(String)
        });
      });
  });
  
  it('gets all tags', () => {
    return Tag.create({ name: '#getall' })
      .then(() => {
        return request(app)
          .get('/tags');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

});

describe('tweet routes', () => {

  afterEach(() => {
    Tweet.drop();
  });

  it('creates a tweet', () => {
    return request(app)
      .post('/tweets')
      .send({ handle: 'chris', text: 'first tweet' })
      .then(receivedTweet => {
        expect(receivedTweet.body).toEqual({
          handle: 'chris',
          text: 'first tweet',
          _id: expect.any(String)
        });
      });
  });
  
  it('reads a tweet with id', () => {
    return Tweet
      .create({ handle: 'tester', text: 'get test' })
      .then(createdTweet => {
        return request(app)
          .get(`/tweets/${createdTweet._id}`);
      })
      .then(receivedTweet => {
        expect(receivedTweet.body).toEqual({
          handle: 'tester',
          text: 'get test',
          _id: expect.any(String)
        });
      });
  });
  
  it('reads all tweets', () => {
    return Tweet
      .create({ handle: 'tester', text: 'get test' })
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(receivedTweets => {
        expect(receivedTweets.body).toHaveLength(1);
      });
  });

  it('updates a tweet', () => {
    return Tweet
      .create({ handle: 'tseter', text: 'put test' })
      .then(originalTweet => {
        return request(app)
          .put(`/tweets/${originalTweet._id}`)
          .send({ handle: 'tester', text: 'fixed tweet' });
      })
      .then(updatedTweet => {
        expect(updatedTweet.body).toEqual({ 
          handle: 'tester', 
          text: 'fixed tweet',
          _id: expect.any(String)
        });
      });
  });
  
  it('deletes a tweet', () => {
    return Tweet
      .create({ handle: 'tester', text: 'delete test' })
      .then(tweetToBeDeleted => {
        return request(app)
          .delete(`/tweets/${tweetToBeDeleted._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ 
          deleted: 1
        });
      });
  });

});
