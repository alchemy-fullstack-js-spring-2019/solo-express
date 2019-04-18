# Express Middleware

Express middleware allows us to invoke functions between
a request coming in a a response going out. Middleware
is a function that takes three arguments `req`, `res`, and
`next`. It is applied with `app.use`

```js
app.use((req, res, next) => {
  console.log('Request Incoming!');
  next();
});
```

The `next` function should be invoked after your
middleware is done.

## Logger

Create logging middleware so we can keep track of the
requests that hit our server.

* Create and use a logging middleware in `lib/app.js`
* On every request `console.log` the requested method
* On every request `console.log` the requested pathname
* E.G. `GET /tweets`

## Logger with response code

Refactor our logging middleware so that the response
status code is included in the messageature
* set the `res.status` to 500
* respond with `{ error: 'Internal Server Error' }`
* BONUS:
  * create a custom `HttpError` class
    * `HttpError` `extends` `Error`
    * `HttpError` takes a `code` and `message` in its constructor
    * inside your middleware check `if(err instanceof HttpError)`
      and if so use `err.code` and `err.message` for your status and
      `{ error: err.message }`.
  * `if(err.name === 'CastError' || err.name === 'ValidationError')`
    * if so status should be 400 and respond with the `{ error: err.message }`
  * `if(process.env.NODE_ENV !== 'production')`
    * respond with `{ error: err.message }`
    * `console.log(err)`

## Futurama express middleware

Use the [http://futuramaapi.herokuapp.com/](http://futuramaapi.herokuapp.com/) API to get random quotes.

* create a `lib/services/futuramaApi.js`
  * export a function `getRandomQuote(n)` that returns an array of `n` random quotes
* create a `lib/middleware/futuramaApi.js`
  * use the `getRandomQuote` service to get **1** random quote
  * attach the random quote to `req.quote`
* create a new route `/random` that uses the `futurama` middleware
  * `app.get('/random', futurama, (req, res) => {})`
  * respond with the random quote
