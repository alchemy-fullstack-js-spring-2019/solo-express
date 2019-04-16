const request = require('supertest');
const app = require('../lib/app');
const Troll = require('../lib/models/Troll');


describe('app routes', () => {
  afterEach(() => {
    return Troll.drop();
  });

  it('can create a new troll', () => {
    return request(app)
      .post('/trolls')
      .send({
        handle: 'hideoustroll'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'hideoustroll',
          date: expect.any(String),
          _id: expect.any(String)
        });
      });
  });

  it('can return all trolls', () => {
    return request(app)
      .get('/trolls')
      .then(res => {
        expect(res.body).toEqual([]);
      });
  });

  it('can get a troll by id', () => {
    return request(app)
      .post('/trolls')
      .send({
        handle: 'testname'
      })
      .then(troll => {
        return request(app)
          .get(`/trolls/${troll.body._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'testname',
          date: expect.any(String),
          _id: expect.any(String)
        });
      });
  });

  it('can find a tweet by id and update', () => {
    return Troll.create({
      handle: 'test'
    })
      .then(troll => {
        return request(app)
          .put(`/trolls/${troll._id}`).send({ handle: 'different' })
          .then(res => {
            expect(res.body.handle).toEqual('different');
          });
      });
  });

  it('can find and delete a troll by id', () => {
    return request(app)
      .post('/trolls')
      .send({
        handle: 'test',
      })
      .then(troll => {
        return request(app)
          .delete(`/trolls/${troll.body._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          deleted: 1
        });
      });
  });  
});

