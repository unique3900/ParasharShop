const mongoose = require('mongoose');
const express = require('express');
const { LoginController, RegisterController } = require('../controllers/AuthController');

const router = express.Router();

router.post('/register', RegisterController)
    .post('/login', LoginController);


exports.router = router;