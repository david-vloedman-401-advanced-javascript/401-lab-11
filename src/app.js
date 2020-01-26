'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./middleware/500');
const notFound = require('./middleware/404');
const router = require('./route/routes');
const accessRouter = require('./route/accessRoutes');

// Prepare the express app
const app = express();

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/config/swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(router);
app.use(accessRouter);

// Catchalls
app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
