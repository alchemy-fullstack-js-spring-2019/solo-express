const app = require('../lib/app');
const request = require('supertest');
const Tweet = require('../lib/models/Tweet');

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
                    _id: expect.any(String)
                });
            });
    });

    it('can find all tweets', () => {
        return request(app)
            .get('/tweets')
            .then(res => {
                expect(res.body.length).not.toEqual(0);
            });
    });

    it('can find a tweet by id', () => {
        return Tweet
            .create({
                handle: 'anna',
                body: 'annas tweet'
            })
            .then(tweet => {
                return request(app)
                    .get(`/tweets/${tweet._id}`);
            })
            .then(res => {
                expect(res.body).toEqual({
                    handle: 'anna',
                    body: 'annas tweet',
                    _id: expect.any(String)
                });
            });
    });

    it('can update a tweet by id', () => {
        return Tweet
            .create({
                handle: 'anna',
                body: 'annas tweet'
            })
            .then(tweet => {
                return request(app)
                    .put(`/tweets/${tweet._id}`)
                    .send({
                        handle: 'anna',
                        body: 'my updated tweet'
                    });
            })
            .then(res => {
                expect(res.body).toEqual({
                    handle: 'anna',
                    body: 'my updated tweet',
                    _id: expect.any(String)
                });
            });
    });
});

