const express = require('express');
const router = express.Router();
const User = require('../model/user');
const user = new User();
const auth = require('../middleware/authMiddleware');


router.post('/signup', (req, res, next) => {  
  user.save(req.body)
    .then(rec => {
      const token = user.generateToken(rec);
      res.status(200).send(token);
    })
    .catch(err => res.status(403).send('Error creating user'));
});


router.post('/signin', auth, (req, res) => {
  res.status(200).send(req.token);
});



router.get('/users', (req, res)=> {
  user.get()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err =>{
      res.status(403).send('Could not get user list');
    });
});


module.exports = router;