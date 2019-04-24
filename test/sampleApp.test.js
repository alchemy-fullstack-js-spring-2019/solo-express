const app = require('../lib/sampleApp');
const request = require('supertest');

describe('app routes', () => {
    it('responds with hi at /hello', () => {
        return request(app)
            .get('/hello')
            .then(res => {
                expect(res.body).toEqual({ name: 'ryan' });
                //for text, use res.text
            });
    });
});
