const mongoose = require('mongoose');
const express = require('express');
const { LoginController, RegisterController, updateUserController, changePasswordController, getLoggedInDataController } = require('../controllers/AuthController');
const { isLoggedIn } = require('../Middleware/Auth');

const router = express.Router();
router.post('/register', RegisterController)
    .post('/login', LoginController).post('/update',isLoggedIn, updateUserController).post('/change-password',isLoggedIn, changePasswordController).get('/getLoggedInUser', async (req, res) => {
        res.send("Hey");
    }).get('/:email',getLoggedInDataController)
exports.router = router;