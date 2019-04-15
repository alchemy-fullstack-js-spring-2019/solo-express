const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');
const Bug = require('../lib/models/Bug');

describe('tweet routes', () => {

  afterEach(() =>{
    Tweet.drop();
  });

  it('create a new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({ handle: 'jared', body: 'tweety jbird' })
      .then(res => {

        expect(res.body).toEqual({ handle: 'jared', body: 'tweety jbird', _id: expect.any(String) });
      });
  });

  it('can get a list of tweets', () => {
    return Tweet
      .create({ handle: 'jared', body: 'tweety jbird' })
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('get by id', () => {
    return Tweet
      .create({ 
        handle: 'jared', 
        body: 'tweety jbird'
      })
      .then(createdTweet => {
        return request(app)
          .get(`/tweets/${createdTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ handle: 'jared', 
          body: 'tweety jbird', 
          _id: expect.any(String) 
        });
      });
  });

  it('can update a tweet by id', () => {
    return Tweet.create({ handle: 'jared', body: 'tweety jbird' })
      .then(tweet => {
        return request(app)
          .put(`/tweets/${tweet._id}`)
          .send({ 
            handle: 'jared', 
            body: 'big cheese' 
          });
      })
      .then(res => {
        expect(res.body).toEqual({ 
          handle: 'jared', 
          body: 'big cheese', 
          _id: expect.any(String) 
        });
      });
  });

  it('find by id and delete', () => {
    return Tweet.create({ handle: 'jared', body: 'big cheese' })
      .then(tweet => {
        return request(app)
          .delete(`/tweets/${tweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual(({ deleted: 1 }));
      });
  });

});

describe('bug routes', () => {

  afterEach(() => {
    Bug.drop();
  });

  it('creates bug', () => {
    return request(app)
      .post('/bugs')
      .send({ species: 'daddy long leg', info: 'tall spiders' })
      .then(res => {
        expect(res.body).toEqual({ species: 'daddy long leg', info: 'tall spiders', _id: expect.any(String) });
      });
  });
 
  it('gets all bugs', () => {
    return Bug.create({ species: 'daddy long leg', info: 'tall spiders' })
      .then(() => {
        return request(app)
          .get('/bugs')
          .then(res => {
            expect(res.body).toHaveLength(1);
          });
      });
  });
 
  it('gets bug by id', () => {
    return Bug.create({ species: 'daddy long leg', info: 'tall spiders' })
      .then(createdBug => {
        return request(app)
          .get(`/bugs/${createdBug._id}`)
          .then(res => {
            expect(res.body).toEqual({
              species: 'daddy long leg', 
              info: 'tall spiders',
              _id: expect.any(String)
            });
          });
      });
  });
 
  it('gets bug by id and update', () => {
    return Bug.create({ species: 'daddy long leg', info: 'tall spiders' })
      .then(createdBug => {
        return request(app)
          .put(`/bugs/${createdBug._id}`)
          .send({ 
            species: 'daddy long leg', 
            info: 'really scary spiders' 
          });
      })
      .then(res => {
        expect(res.body).toEqual({ 
          species: 'daddy long leg', 
          info: 'really scary spiders', 
          _id: expect.any(String) 
        });
      });      
  });
 
  it('gets bug by id and delete', () => {
    return Bug.create({ species: 'daddy long leg', info: 'tall spiders' })
      .then(createdBug => {
        return request(app)
          .delete(`/bugs/${createdBug._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({ deleted: 1 });
      });      
  });
});
