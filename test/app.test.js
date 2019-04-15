const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');

describe('app routes', () => {
    it('can create a new tweeet', () => {
        return request(app)
            .post('/tweets')
            .send({
                handle: 'human001',
                body: 'Twit twat'
            })
            .then(res => {
                expect(res.body).toEqual({
                    handle: 'human001',
                    body: 'Twit twat',
                    _id : expect.any(String)
                });
            });
    });
});