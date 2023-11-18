const express = require('express');
const { getSellerInfo, registerSeller, loginSeller } = require('../controllers/SellerController');
const { isSeller } = require('../Middleware/Auth');

const router = express.Router();

router.get('/:id', getSellerInfo).post('/seller-register', registerSeller).post('/seller-login',loginSeller);

exports.router = router;