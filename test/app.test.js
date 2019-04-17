const request = require('supertest');
const app = require('../lib/app');
const Tweet = require('../lib/models/Tweets');

describe('app routes', () => {

  afterEach(()=>{
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
  it('can get a list of tweets', () => {
    return Tweet
      .create({ handle: 'olli', body: 'my tweet' })
      .then(() => {
        return request(app)
          .get('/tweets');
      })
      .then(res => {
        return expect(res.body).toHaveLength(1);
      });
  });

});
//need to test
it('can get a tweet by id', () => {
  return Tweet
    .create({ handle: 'olli', body: 'my tweet' })
    .then(createdTweet=>{
      return request(app)
        .get(`/tweets/${createdTweet._id}`);
    })
    .then(res=>{
      expect(res.body).toEqual({ handle:'olli', body: 'my tweet', _id: expect.any(String) });
    });
});

//not tested
it('can update a tweet by id,', ()=>{
  return Tweet.create({ handle: 'ryan', body:'my tweet' })
    .then(tweet=>{
     
      return request(app)
        .put(`/tweets/${tweet._id}`)
        .send({
          handle:'test',
          body: 'better tweet'
        })
        .then(updatedTweet=>{
         
          return expect(updatedTweet.body).toEqual({ handle:'test', body:'better tweet', _id: expect.any(String) });
        });
    });
});
//not finished
it('can delete a tweet by id', ()=>{
  return Tweet.create({ handle:'Ryan', body:'your weet' })
    .then(tweet=>{
      return request(app)
        .delete(`/tweets/${tweet._id}`);
    })
    .then(deleteCount=>{
     
      expect(deleteCount.body).toEqual({ deleted:1 });
    });
});
