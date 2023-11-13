const express = require('express');
const { fetchUserAddressesController, addUserAddressController } = require('../controllers/AddressController');
const router = express.Router();



router.get('/:id',fetchUserAddressesController).post('/',addUserAddressController)

exports.router=router