const app = require('../lib/app');
const request = require('supertest');
const Tweet = require('../lib/models/Tweet');
const Tag = require('../lib/models/Tag');

describe('Tweet route', () => {
    afterAll(() => {
        return Tweet.drop();
    });
    
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
                expect(res.body.length).toEqual(1);
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

    it('deletes a tweet by id', () => {
        return Tweet
            .create({
                handle: 'anna',
                body: 'annas tweet'
            })
            .then(tweet => {
                return request(app)
                    .delete(`/tweets/${tweet._id}`);
            })
            .then(res => {
                expect(res.body).toEqual({ deleted: 1 });
            });
    }); 
});

describe('tag route', () => {
    afterAll(() => {
        return Tag.drop();
    });
    it('can create a tag', () => {
        return request(app)
            .post('/tags')
            .send({
                name: 'Anna'
            })
            .then(res => {
                expect(res.body).toEqual({
                    name: 'Anna',
                    _id: expect.any(String)
                });
            });
    });
    it('can get all tags', () => {
        return request(app)
            .get('/tags')
            .then(res => {
                expect(res.body).toHaveLength(1);
            });
    });

    it('can get tag by ID', () => {
        return Tag
            .create({ name: 'annas tag' })
            .then(tag => {
                return request(app)
                    .get(`/tags/${tag._id}`);
            })
            .then(res => {
                expect(res.body).toEqual({
                    name: 'annas tag',
                    _id: expect.any(String)
                });
            });
            
    });

    it('updates tag by ID', () => {
        return Tag
            .create({ name: 'annas tag' })
            .then(tag => {
                return request(app)
                    .put(`/tags/${tag._id}`)
                    .send({ name: 'annas updated tag' });
            })
            .then(res => {
                expect(res.body).toEqual({ 
                    name: 'annas updated tag',
                    _id: expect.any(String)
                });
            });
    });

    it('deletes tag by ID', () => {
        return Tag
            .create({ name: 'prepare for deletion' })
            .then(tag => {
                return request(app)
                    .delete(`/tags/${tag._id}`);
            })
            .then(res => {
                expect(res.body).toEqual({ deleted: 1 });
            });
    });

    it('deletes a tweet by id', () => {
        return Tweet
            .create({
                handle: 'anna',
                body: 'annas tweet'
            })
            .then(tweet => {
                return request(app)
                    .delete(`/tweets/${tweet._id}`);
            })
            .then(res => {
                expect(res.body).toEqual({ deleted: 1 });
            });
    }); 
});

