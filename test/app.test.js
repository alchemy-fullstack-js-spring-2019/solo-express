const request = require('supertest');
const app = require('../lib/app');
const Tag = require('../lib/models/Tag');


describe('app routes', () => {
  afterEach(() => {
    return Tag.drop();
  });

  it('can create a new tag', () => {
    return request(app)
      .post('/tags')
      .send({
        name: '#supertesting'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: '#supertesting',
          _id: expect.any(String)
        });
      });
  });

  it('can return all tags', () => {
    return request(app)
      .get('/tags')
      .then(res => {
        expect(res.body).toEqual([]);
      });
  });

  it('can get a tag by id', () => {
    return request(app)
      .post('/tags')
      .send({
        name: '#test',
      })
      .then(tag => {
        return request(app)
          .get(`/tags/${tag.body._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: '#test',
          _id: expect.any(String)
        });
      });
  });

  it('can find a tweet by id and update', () => {
    return Tag.create({
      name: '#test'
    })
      .then(tag => {
        return request(app)
          .put(`/tags/${tag._id}`).send({ name: '#different' })
          .then(res => {
            expect(res.body.name).toEqual('#different');
          });
      });
  });

  it('can get a tweet by id', () => {
    return request(app)
      .post('/tags')
      .send({
        name: '#test',
      })
      .then(tag => {
        return request(app)
          .delete(`/tags/${tag.body._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          deleted: 1
        });
      });
  });  
});

