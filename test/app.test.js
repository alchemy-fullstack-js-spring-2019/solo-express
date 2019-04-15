const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');

describe('Tweet route', () => {
  afterEach(() => {
    return Tweet.drop();
  });

  it('responds with a tweet object on POST', () => {
    return request(app)
      .post('/tweets')
      .send({ handle: 'Tommy', body: 'First tweet' })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'Tommy',
          body: 'First tweet',
          _id: expect.any(String)
        });
      });
  });

  it('responds with all tweets on GET', () => {
    return request(app)
      .post('/tweets')
      .send({ handle: 'Tommy', body: 'First tweet' })
      .then(() => request(app).get('/tweets'))
      .then(res => {
        expect(res.body).toEqual(expect.any(Array));
        expect(res.body).toHaveLength(1);
        expect(res.body).toContainEqual({
          handle: 'Tommy',
          body: 'First tweet',
          _id: expect.any(String)
        });
      });
  });

  it('responds with a tweet by ID on GET', () => {
    return request(app)
      .post('/tweets')
      .send({ handle: 'Tommy', body: 'First tweet' })
      .then(res => request(app).get(`/tweets/${res.body._id}`))
      .then(res => {
        expect(res.body).toEqual({
          handle: 'Tommy',
          body: 'First tweet',
          _id: expect.any(String)
        });
      });
  });

  it('responds with an updated tweet by ID on PUT', () => {
    return request(app)
      .post('/tweets')
      .send({ handle: 'Tony', body: 'First tweet' })
      .then(res => request(app)
        .put(`/tweets/${res.body._id}`)
        .send({ handle: 'Tommy', body: 'Fixed tweet' })
      )
      .then(res => {
        expect(res.body).toEqual({
          handle: 'Tommy',
          body: 'Fixed tweet',
          _id: expect.any(String)
        });
      });
  });

  it('responds with deletion object after deleting by ID on DELETE', () => {
    return request(app)
      .post('/tweets')
      .send({ handle: 'Tommy', body: 'First tweet' })
      .then(res => request(app).delete(`/tweets/${res.body._id}`))
      .then(res => {
        expect(res.body).toEqual({ deleted: 1 });
      });
  });
});
