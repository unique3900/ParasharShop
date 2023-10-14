const express = require('express');
const { fetchBrands, createBrand } = require('../controllers/BrandsController');

const router = express.Router();

router.get('/', fetchBrands).post('/', createBrand);


exports.router = router;