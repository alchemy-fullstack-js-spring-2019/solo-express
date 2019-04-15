const app = require('../lib/app');
const request = require('supertest');
const Tweet = require('../lib/models/Tweets');
const User = require('../lib/models/Users');

describe('app routes', () => {
  afterEach(() => {
    return Tweet.drop();
  });

  afterEach(() => {
    return User.drop();
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
  it('finds by id and deletes', () => {
    return Tweet
      .create({ handle: 'cindy', body: 'hello I am tweeting' })
      .then((createdTweet) => {
        return request(app)
          .delete(`/tweets/${createdTweet._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          deleted: 1
        });
      });
  });
  it('can make a new user', () => {
    return request(app)
      .post('/users')
      .send({ 
        name: 'meg',
        sign: 'aries'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'meg',
          sign: 'aries',
          _id: expect.any(String)
        });
      });
  });
  it('can find all users', () => {
    return User
      .create({ name: 'erin', sign: 'libra' })
      .then(() => {
        return request(app)
          .get('/users');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });
  it('can find a user by id', () => {
    return User
      .create({ name: 'patrick', sign: 'pisces' })
      .then((createdUser) => {
        return request(app)
          .get(`/users/${createdUser._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'patrick',
          sign: 'pisces',
          _id: expect.any(String)
        });
      });
  });
  it('can find a user by id and update', () => {
    return User
      .create({ name: 'kelly', sign: 'capricorn' })
      .then((createdUser) => {
        return request(app)
          .put(`/users/${createdUser._id}`)
          .send({
            name: 'kellie', 
            sign: 'capricorn'
          })
          .then(res => {
            expect(res.body).toEqual({
              name: 'kellie',
              sign: 'capricorn',
              _id: expect.any(String)
            });
          });
      });
  });
  it('can find a user by id and delete', () => {
    return User
      .create({ name: 'kevin', sign: 'pisces' })
      .then((createdUser) => {
        return request(app)
          .delete(`/users/${createdUser._id}`)
      })
      .then(res => {
        expect(res.body).toEqual({
          deleted: 1
        });
      });
  });
});
