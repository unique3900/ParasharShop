const express = require('express');
const { getSellerInfo, registerSeller, loginSeller } = require('../controllers/SellerController');
const { isSeller } = require('../Middleware/Auth');

const router = express.Router();
const passport=require('passport');
router.get('/own',passport.authenticate('jwt'), getSellerInfo).post('/seller-register',passport.authenticate('jwt'), registerSeller).post('/seller-login',passport.authenticate('jwt'),loginSeller);

exports.router = router;