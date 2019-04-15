const { Router } = require('express');
const Bug = require('../models/Bug');

module.exports = Router() 
  .post('/', (req, res, next) => {
    const { species, info } = req.body;

    Bug
      .create({ species, info })
      .then(createdBug => {
        res.send(createdBug);
      })
      .catch(err => next(err));
  })
  
  .get('/', (req, res, next) => {
    const { species, info } = req.body;

    Bug
      .find()
      .then(allBugs => {
        res.send(allBugs);
      })
      .catch(err => next(err));
  })
  
  .get('/:id', (req, res, next) => {
    const { id } = req.params;

    Bug
      .findById(id)
      .then(bug => { res.send(bug);})
      .catch(err => {
        next(err);
      });
  })

  .put('/:id', (req, res, next) => {
    const { id } = req.params;
    const { 
      species, 
      info } = req.body;
    Bug
      .findByIdAndUpdate(id, { species, info })
      .then(updatedBug => res.send(updatedBug))
      .catch(err => { 
        next(err);
      });
  })

  .delete('/:id', (req, res, next) => {
    const { id } = req.params;
    
    Bug
      .findByIdAndDelete(id)
      .then(result => { res.send(result);})
      .catch(err => {
        next(err);
      });
  })



;

  
