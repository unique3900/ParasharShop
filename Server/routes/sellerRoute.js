const express = require('express');
const { getSellerInfo, registerSeller } = require('../controllers/SellerController');

const router = express.Router();

router.get('/', getSellerInfo).post('/seller-register', registerSeller).post('/seller-login');

exports.router = router;