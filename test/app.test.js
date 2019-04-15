const request = require('supertest');
const app = require('../lib/app');


describe('app routes', () => {
    it('can create a new tweet', () => {
        return request(app)
            .post('/tweets')
            .send({
                handle: 'bonnie',
                body: 'my first tweet'
            })
            .then(res => {
                expect(res.body).toEqual({
                    handle: 'bonnie',
                    body: 'my first tweet',
                    _id: expect.any(String)
                });
            });
    });
});
