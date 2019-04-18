const app = require('../lib/app');
const request = require('supertest');
const Tag = require('../lib/models/Tag');

describe('tag router', () => {
    afterEach(() => {
        return Tag.drop();
    });
    it('creates a new tag', () => {
        return request(app)
        .post('/tags')
        .send({
            tag: '#dogs'
        })
        .then(res => {
            expect(res.body).toEqual({
                tag: '#dogs',
                _id: expect.any(String)
            });
        });
    });

    it('finds all tags', () => {
        return Tag
        .create({ tag: '#servers' })
        .then(() => {
            return request(app)
            .get('/tags');
        }) 
        .then(tags => {
            expect(tags.body).toHaveLength(1);
        });
    });

    it('finds a tag by id', () => {
        return Tag
        .create({ tag: '#clients' })
        .then(tag => {
            return request(app)
            .get(`/tags/${tag._id}`);
        })
        .then(result => {
            expect(result.body).toEqual({
                tag: '#clients',
                _id: expect.any(String)
            });
        });
    });

    it('updates a tag by id', () => {
        return Tag.create({ tag: '#fried' })
        .then(tag => {
            return request(app)
            .put(`/tags/${tag._id}`)
            .send({
                tag: '#friend'
            });
        })
        .then(results => {
            expect(results.body).toEqual({
                tag: '#friend',
                _id: expect.any(String)
            });
        });
    });

    it('deletes a tag by id', () => {
      return Tag.create({ tag: '#butts' })
      .then(tag => {
          return request(app)
          .delete(`/tags/${tag._id}`);
      })  
      .then(result => {
          expect(result.body).toEqual({
              deleted: 1
          });
      });
    });
});