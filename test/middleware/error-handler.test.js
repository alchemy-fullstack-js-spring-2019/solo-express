const errorHandler = require('../../lib/middleware/error-handler');

describe('middleware test', () => {
  it('responds with 404 status and error message when err.name = CastError', () => {
    const req = {};
    const next = jest.fn();
    const err = { name: 'CastError', message: 'CastError' };
  
    const res = {};
    const status = jest.fn(() => res);
    res.status = status;
    const send = jest.fn();
    res.send = send;
  
    errorHandler(err, req, res, next);
    expect(status).toHaveBeenCalledWith(400);
    expect(send).toHaveBeenCalledWith({ error: 'CastError' });
  }); 
});
  
