const express = require('express');
const router = express().router();
const auth = require('../middleware/authMiddleware');

router.use(auth);

router.post('/signup', signupHandler);
router.post('/signin', signinHandler);