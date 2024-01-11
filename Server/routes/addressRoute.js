const express = require('express');
const { fetchUserAddressesController, addUserAddressController, deleteAddressController, updateAddressController } = require('../controllers/AddressController');
const router = express.Router();
const passport = require('passport');


router.get('/',passport.authenticate('jwt'),fetchUserAddressesController).post('/',passport.authenticate('jwt') ,addUserAddressController).delete('/:id',deleteAddressController).patch('/:id',updateAddressController)

exports.router=router