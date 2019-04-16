const { app } = require('../lib/app');
const request = require('supertest');
const Tweet = require('../lib/models/Tweet');
const Tag = require('../lib/models/Tag');

describe('tweet tests', ()=> {
    beforeEach(()=> {
        return Tweet.drop(), Tag.drop();
    });

    it('will post a tweet to data', ()=> {
        return request(app)
            .post('/tweets')
            .send({
                handle: 'emily',
                body: 'this is a tweet'
            })
            .then(res => {
                expect(res.body).toEqual({
                    handle: 'emily',
                    body: 'this is a tweet',
                    _id: expect.any(String)
                });
            });
    });

    it('can get a list of tweets', ()=> {
        return Tweet
            .create({
                handle: 'emily',
                body: 'my cool tweet'
            })
            .then(()=> {
                return request(app)
                    .get('/tweets');
            })
            .then(res => {
                expect(res.body).toHaveLength(1);
            });
    });

    it('can get a list of tweets by id', ()=> {
        return Tweet 
            .create({ 
                handle: 'emily', 
                body: 'my really cool tweet'
            })
            .then((createdTweet)=> {
                return request(app)
                    .get(`/tweets/${createdTweet._id}`);
            })
            .then(res => {
                expect(res.body).toEqual({
                    handle: 'emily',
                    body: 'my really cool tweet',
                    _id: expect.any(String)
                });
            });
    });

    it('can update a tweet by id', ()=> {
        return Tweet
            .create({
                handle: 'emily',
                body: 'my silly tweet'
            })
            .then(createdTweet => {
                return request(app)
                    .put(`/tweets/${createdTweet._id}`)
                    .send({
                        handle: 'emily',
                        body: 'my really silly tweet'
                    });
            })
            .then(res => {
                expect(res.body).toEqual({
                    handle: 'emily',
                    body: 'my really silly tweet',
                    _id: expect.any(String)
                });
            });
    });

    it('can delete a tweet by id', ()=> {
        return Tweet
            .create({
                handle: 'emily', 
                body: 'feel cute might delete'
            })
            .then(createdTweet => {
                return request(app)
                    .delete(`/tweets/${createdTweet._id}`);
            })
            .then(res => {
                expect(res.body).toEqual({
                    deleted: 1
                });
            });
    });

    it('will post a tag', ()=> {
        return request(app)
            .post('/tags')
            .send({
                name: '#coolstuff'
            })
            .then(res => {
                expect(res.body).toEqual({
                    name: '#coolstuff',
                    _id: expect.any(String)
                });
            });
    });
});
