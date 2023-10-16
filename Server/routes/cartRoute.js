const mongoose = require('mongoose');
const express = require('express');
const { fetchUserCart } = require('../controllers/CartController');

const router = express.Router();


router.get('/:id',fetchUserCart).post('/')


exports.router = router;