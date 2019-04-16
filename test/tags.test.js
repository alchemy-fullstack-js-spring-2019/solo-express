const req = require('supertest');
const app = require('../lib/tags');
const Tag = require('../lib/models/Tag');

describe('it responds to app routes', () => {
  afterEach(() => {
    return Tag.drop();
  });
  it('can create a new tag', () => {
    return req(app)
      .post('/tags')
      .send({
        name: '#js'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: '#js',
          _id: expect.any(String)
        });
      });
  });
  it('can get a list of tags', () => {
    return Tag
      .create({ name: '#js' })
      .then(() => {
        return req(app)
          .get('/tags');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });





});
