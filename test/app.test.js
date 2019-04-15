const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweet');
const mkdirp = require('mkdirp'); 



describe('app routes', () => {
    beforeAll(done => {
        mkdirp('./data/tweets', done);
    });
    afterAll(() => {
        return Tweet.drop();
    });
    // it('can create a new tweet', () => {
    //     return request(app)
    //         .post('/tweets')
    //         .send({
    //             handle: 'bonnie',
    //             body: 'my first tweet'
    //         })
    //         .then(res => {
    //             expect(res.body).toEqual({
    //                 handle: 'bonnie',
    //                 body: 'my first tweet',
    //                 _id: expect.any(String)
    //             });
    //         });
    // });
    it('can get tweets', () => {
        return request(app)
            .get('/tweets')
            .then(res => {
                console.log(res.body);
            });
    });
});
