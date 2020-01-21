'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MongoModel = require('@david-vloedman/mymongomodel');
const schema = require('./userSchema');

const SECRET = 'sauce';



class User extends MongoModel {
  constructor(){
    super(schema);
  }

  async save(record){
    
    let {username, password} = record;      
    
    password = await bcrypt.hash(password, 5);
    let hashed = { username: username, password: password };    
    await this.post(hashed);    
    return record;
  }  

  async authenticationBasic(user, pass){
    
    let dbuser = await schema.find({username: user});
    
    let valid = await bcrypt.compare(pass, dbuser[0].password);
    
    return valid? dbuser : Promise.reject();
  }

  generateToken(user){
    let token = jwt.sign({ username: user.username }, SECRET);
    return token;
  }
}

module.exports = User;