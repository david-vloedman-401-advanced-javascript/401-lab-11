const express = require('express');
const cors = require('cors');
const server = express();
const router = require('./route/routes');



server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use(router);
server.use(cors);


module.exports = {
  server: server,
  start: port =>
    server.listen(port, () => console.log(`Server up on port ${port}`)),
};