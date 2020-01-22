'use strict';

const base64 = require('base-64');
const User = require('../model/user');
const users = new User();

/**
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid Login');
    return;
  }
  
  let basic = req.headers.authorization.split(' ').pop();
  let [user, pass] = base64.decode(basic).split(':');

  users
    .authenticationBasic(user, pass)
    .then(validUser => {
      req.token = users.generateToken(validUser);
      next();
    })
    .catch(err => next('Invalid Login'));
};
