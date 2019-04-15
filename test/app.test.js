const { app } = require('../lib/app');
const request = require('supertest');

describe('app tests', ()=> {
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
});
