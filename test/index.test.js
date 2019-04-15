const request = require('supertest');
const app = require('../lib/app');

describe('ROUTE TESTS', () => {
  it('get routes', () => {
    return request(app)
      .get('/tweets')
      .then(res => {
        expect(res.text).toEqual('sup with it');
      });
  });
});
