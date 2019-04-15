const app = require('../lib/app');
const request = require('supertest');

describe('tweet router', () => {
    it('creates a new tweet', () => {
        return request(app)
        .post('/tweets')
        .send({
            handle: 'ben',
            body: 'hello there'
        })
        .then(res => {
            expect(res.body).toEqual({
                handle: 'ben',
                body: 'hello there',
                _id: expect.any(String)
            });
        });
    });

});