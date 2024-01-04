const mongoose = require('mongoose');
const express = require('express');
const { LoginController, RegisterController, updateUserController, changePasswordController, getLoggedInDataController, CheckUser } = require('../controllers/AuthController');

const passport = require('passport');


const router = express.Router();
router.post('/register', RegisterController)
    .post('/login', passport.authenticate('local'),LoginController).get('/check-user',passport.authenticate('jwt'), CheckUser).post('/update', updateUserController).post('/change-password',passport.authenticate('jwt'), changePasswordController).get('/own',passport.authenticate('local'),getLoggedInDataController)
exports.router = router;