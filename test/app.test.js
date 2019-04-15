const app = require('../lib/app');
const request = require('supertest');

describe('app routes', () => {
    it('can create a new tweet', () => {
        return request(app)
            .post('/tweets')
            .send({
                handle: 'ryan',
                body: 'my first tweet'
            })
            .then(res => {
                expect(res.body).toEqual({
                    handle: 'ryan',
                    body: 'my first tweet',
                    id: expect.any(String)
                });
            });
    });
});
