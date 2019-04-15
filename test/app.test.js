const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');

describe('app routes', () => {

    //drop tweets nafterEeach()

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
    it('can get a list of tweets', () => {
        return Tweet.create({ handle: 'olli', body: 'my tweet' })
            .then(() => {
                return request(app)
                    .get('./tweets');
            })
            .then(res => {
                expect(res.body).toHaveLength(1);
            })
    })

});
it('can get a tweet by id', () => {
    return Tweet
        .create({ handle: 'olli', body: 'my tweet' })
})