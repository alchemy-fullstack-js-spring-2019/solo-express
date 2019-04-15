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
        Tag
        .create({ tag: '#clients' })
        .then(() => {
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
});