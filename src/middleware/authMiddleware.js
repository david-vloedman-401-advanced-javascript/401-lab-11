'use strict';

const base64 = require('base64');
const users = require('../model/user');




module.exports = (req, res, next) => {
  if(!req.headers.authorization) {next('Invalid User Login'); return; }
  let basic = req.header.authorization.split(' ').pop();
  let  [user, pass] = base64.decode(basic).split(':');
  

}