const app = require('../lib/app');
const request = require('supertest');
const Tweet = require('../lib/models/Tweet');

describe('tweet router', () => {
    afterEach(() => {
        return Tweet.drop();
      });
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

    it('finds all tweets', () => {
        return Tweet
        .create({ handle: 'ben', body: 'hello' })
        .then(() => {
            return request(app)
            .get('/tweets');
        })
        .then(tweets => {
            expect(tweets.body).toHaveLength(1);
        });
    });

});