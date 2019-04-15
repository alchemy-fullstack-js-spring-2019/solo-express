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
    it('returns a list of tweets', () => {
        return Tweet.create({ handle: 'Ryan', body: 'Dope Tweet Today' })
            .then(() => {
                return request(app)
                    .get('/tweets')
                    .then(response => {
                        expect(response.body).toHaveLength(1);
                    });
            });
    });
    it('can get a tweet by id', () => {
        return Tweet.create({ handle: 'Ryan', body: 'GETTING tweets by ID Today' })
            .then(createdTweet => {
                return request(app)
                    .get(`/tweets/${createdTweet._id}`)
                    .then(response => {
                        expect(response.body).toEqual({
                            handle: 'Ryan',
                            body: 'GETTING tweets by ID Today',
                            _id: expect.any(String)
                        });
                    });
            });
    });
    it('can update a tweet by its id', () => {
        return Tweet.create({ handle: 'Colin', body: 'this tweet will be updated' })
            .then(updatedTweet => {
                return request(app)
                    .put(`/tweets/${updatedTweet._id}`)
                    .send({
                        handle: 'Colin',
                        body: 'This was updated'
                    });
            })
            .then(response => {
                expect(response.body).toEqual({
                    handle: 'Colin',
                    body: 'This was updated',
                    _id: expect.any(String)
                });
            });
    });
    it('can delete a tweet by id', () => {
        return Tweet.create({ handle: 'Colin', body: 'this tweet will be deleted' })
            .then(tweet => {
                return request(app)
                    .delete(`/tweets/${tweet._id}`);
            })
            .then(response => {
                expect(response.body).toEqual({
                    deleted: 1
                });
            });
    });
});
