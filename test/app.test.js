const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {
  it('responds with hi at /hello', () => {
    return request(app)
      .get('/hello')
      .then(res => {
        expect(res.body).toEqual({ name: 'Mal' });
      });
  });
});
