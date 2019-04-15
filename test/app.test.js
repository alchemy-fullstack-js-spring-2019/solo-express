const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {
  it('create a new tweet', () => {
    return request(app)
      .post('/tweets')
      .send({ handle: 'jared', body: 'tweety jbird' })
      .then(res => {
        expect(res.body).toEqual({ handle: 'jared', body: 'tweety jbird', _id: expect.any(String) });
      });
  });
});
