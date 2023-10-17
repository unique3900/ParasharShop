const mongoose = require('mongoose');
const express = require('express');
const { LoginController, RegisterController, updateUserController } = require('../controllers/AuthController');

const router = express.Router();

router.post('/register', RegisterController)
    .post('/login', LoginController).post('/update',updateUserController)


exports.router = router;