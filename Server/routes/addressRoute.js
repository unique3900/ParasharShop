const express = require('express');
const { fetchUserAddressesController, addUserAddressController, deleteAddressController, updateAddressController } = require('../controllers/AddressController');
const router = express.Router();



router.get('/:id',fetchUserAddressesController).post('/',addUserAddressController).delete('/:id',deleteAddressController).patch('/:id',updateAddressController)

exports.router=router