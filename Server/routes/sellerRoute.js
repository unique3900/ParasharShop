const express = require('express');
const { getSellerInfo, registerSeller } = require('../controllers/SellerController');
const { isSeller } = require('../Middleware/Auth');

const router = express.Router();

router.get('/', getSellerInfo).post('/seller-register', registerSeller).post('/seller-login');

exports.router = router;