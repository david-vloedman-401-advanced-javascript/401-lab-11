'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MongoModel = require('@david-vloedman/mymongomodel');
const schema = require('./userSchema');

const SECRET = 'sauce';


/**
 * @class
 */
class User extends MongoModel {
  constructor(){
    super(schema);
  }
  /**
   * Saves a user to DB
   * @param  record 
   * @return record
   */
  async save(record){
    
    let {username, password} = record;      
    
    password = await bcrypt.hash(password, 5);
    let hashed = { username: username, password: password };    
    await this.post(hashed);    
    return record;
  }  
  /**
   * Validates a password against the DB
   * @param {*} user 
   * @param {*} pass 
   * @returns a record
   */
  async authenticationBasic(user, pass){
    
    let dbuser = await schema.find({username: user});
    
    let valid = await bcrypt.compare(pass, dbuser[0].password);
    
    return valid? dbuser : Promise.reject();
  }
  /**
   * Generates a token for a user
   * @param {*} user 
   * @return token
   */
  generateToken(user){
    let token = jwt.sign({ username: user.username }, SECRET);
    return token;
  }
}

module.exports = User;