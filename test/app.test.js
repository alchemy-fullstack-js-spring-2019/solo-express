const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');

describe('app routes', () => {
    afterEach(() => {
        return Tweet.drop();
    });
    it('create a new tweet', () => {
        return request(app)
            .post('/tweets')
            .send({
                handle: 'Ryan',
                body: 'my first tweet'
            })
            .then(response => {
                expect(response.body).toEqual({ 
                    handle: 'Ryan',
                    body: 'my first tweet',
                    _id: expect.any(String)
                });
            });
    });
});
