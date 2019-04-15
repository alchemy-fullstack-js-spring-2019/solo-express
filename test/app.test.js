const { app } = require('../lib/app');
const request = require('supertest');
const Tweet = require('../lib/models/Tweet');

describe('app tests', ()=> {
    afterEach(()=> {
        return Tweet.drop();
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
                handle: 'emily', body: 'my cool tweet' })
            .then(()=> {
                return request(app)
                    .get('/tweets');
            })
            .then(res => {
                expect(res.body).toHaveLength(1);
            });
        

    });
});
