const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');
const mkdirp = require('mkdirp'); 

describe('app routes', () => {
    beforeAll(done => {
        mkdirp('./data/tweets', done);
    });
    afterEach(() => {
        return Tweet.drop();
    });

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

    it('can get all tweets', () => {
        return Tweet
            .create({ handle: 'bonnie', body: 'tweet' })
            .then(() => {
                return request(app)
                    .get('/tweets');
            })
            .then(res => {
                expect(res.body).toHaveLength(1);
            });
    });

    // this test technically is testing both post and get,
    // but I like it for practice so I'll keep it and make a 
    // new get test
    it('can post a tween and then get it by id', () => {
        return request(app)
            .post('/tweets')
            .send({
                handle: 'bonnie',
                body: 'my second tweet'
            })
            .then(res => res.body._id)
            .then(id => {
                return request(app)
                    .get(`/tweets/${id}`);
            })
            .then(res => {
                expect(res.body).toEqual({
                    handle: 'bonnie',
                    body: 'my second tweet',
                    _id: expect.any(String)
                });
            });
    });

    it('can get a tweet by id', () => {
        return Tweet.create({ handle: 'barry', body: 'meow'})
            .then(createdTweet => {
                return request(app)
                    .get(`/tweets/${createdTweet._id}`);
            })
            .then(res => {
                expect(res.body).toEqual({ 
                    handle: 'barry', 
                    body: 'meow',
                    _id: expect.any(String)
                });
            });
    });

    it('can update a tweet by id', () => {
        return Tweet.create({ handle: 'b', body: 'drivel' })
            .then(tweet => {
                return request(app)
                    .put(`/tweets/${tweet._id}`)
                    .send({
                        handle: 'b',
                        body: 'something more interesting'
                    });
            })
            .then(res => {
                expect(res.body).toEqual({
                    handle: 'b',
                    body: 'something more interesting',
                    _id: expect.any(String)
                });
            });
    });

});
