const express = require('express');
const { getSellerInfo, registerSeller, loginSeller, sellerPasswordChange } = require('../controllers/SellerController');
const { isSeller } = require('../Middleware/Auth');

const router = express.Router();
const passport=require('passport');
const { changePasswordController } = require('../controllers/AuthController');
router.get('/own',passport.authenticate('jwt'), getSellerInfo).post('/seller-register',passport.authenticate('jwt'), registerSeller).post('/seller-login',passport.authenticate('jwt'),loginSeller).post('/change-password',passport.authenticate('jwt'),sellerPasswordChange)

exports.router = router;