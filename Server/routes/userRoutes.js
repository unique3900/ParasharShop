const mongoose = require('mongoose');
const express = require('express');
const { LoginController, RegisterController, updateUserController, changePasswordController, getLoggedInDataController, CheckUser } = require('../controllers/AuthController');
const { isLoggedIn } = require('../Middleware/Auth');
const passport = require('passport');


const router = express.Router();
router.post('/register', RegisterController)
    .post('/login', passport.authenticate('local'),LoginController).get('/check-user',passport.authenticate('jwt'), CheckUser).post('/update', updateUserController).post('/change-password', changePasswordController).get('/getLoggedInUser', async (req, res) => {
        res.send("Hey");
    }).get('/:id',getLoggedInDataController)
exports.router = router;