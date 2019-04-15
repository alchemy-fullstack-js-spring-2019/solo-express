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
            console.log(tags.body);
            expect(tags.body).toHaveLength(1);
        });
        
    });
});