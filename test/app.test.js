const request = require('supertest');
const app = require('../lib/app.js');
const Chirps = require('../models/Chirps');
const Growls = require('../models/Growls');

describe('Testing growl message board', () => {
  afterEach(() => {
    return Growls.drop();
  });
  it('can post a growl', () => {
    return request(app)
      .post('/growls')
      .send({ handle: 'Grizz Lee', body: 'Grrr rrr' })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'Grizz Lee',
          body: 'Grrr rrr',
          _id: expect.any(String)
        });
      });
  });

  it('gets a list of all growls', () => {
    return Growls.create({ handle: 'Tigger', body: 'bounce' })
      .then(() => {
        return request(app)
          .get('/growls');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

});



describe('Testing chirp message board', () => {
  afterEach(() => {
    return Chirps.drop();
  });
  it('creates chirp and returns chirp object', () => {
    return request(app)
      .post('/chirps')
      .send({
        handle: 'robyn',
        body: 'poo-tee-weet'
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'robyn',
          body: 'poo-tee-weet',
          _id: expect.any(String)
        });
      });
  });

  it('gets a list of all chirps', () => {
    return Chirps.create({ handle: 'Mocky', body: 'tee-doh-tee' })
      .then(() => {
        return request(app)
          .get('/chirps');
      })
      .then(res => {
        expect(res.body).toHaveLength(1);
      });
  });

  it('gets a single chirp by id', () => {
    return Chirps.create({ handle: 'Jay', body: 'tee-toooo' })
      .then(createdChirp => {
        return request(app)
          .get(`/chirps/${createdChirp._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'Jay',
          body: 'tee-toooo',
          _id: expect.any(String)
        });
      });
  });

  it('it updates a chirp body', () => {
    return Chirps.create({ handle: 'Robyn', body: 'grrr' })
      .then(createdChirp => {
        return request(app)
          .put(`/chirps/${createdChirp._id}`)
          .send({ handle: 'Robyn', body: 'poo-tee-weet' });
      })
      .then(res => {
        expect(res.body).toEqual({
          handle: 'Robyn',
          body: 'poo-tee-weet',
          _id: expect.any(String)
        });
      });
  });

  it('deletes a chirp, using id', () => {
    return Chirps.create({ handle: 'Tweety', body: 'I did see a putty tat' })
      .then(createdChirp => {
        return request(app)
          .delete(`/chirps/${createdChirp._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          deleted: 1
        });
      });
  });
});

