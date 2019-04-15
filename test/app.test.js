const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweets');

describe('app routes', () => {
  afterEach(() => {
    return Tweet.drop();
  });

  it('can create a new tweet', () => {
    return request(app)
      .post('./tweets')
      .send({
        handle: 'gilgamesh',
        body: 'enkidu ?'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'gilgamesh',
          body: 'enkidu ?',
          _id: expect.any(String)
        });
      });
  });
});
