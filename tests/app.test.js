const app = require('app');
const request = require('supertest');

describe('responds with hi at /hello', () => {
    return request(app)
        .get('/hello')
        .then(res => {
            expect(res.text).toEqual('hi');
        })
});