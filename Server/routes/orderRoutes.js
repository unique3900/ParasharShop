const express = require('express');
const { newOrderController, userOrderController, fetchSellerOrders, updateOrderSellerSideController, fetchTotalOrers, braintreeTokenController, braintreePaymentController } = require('../controllers/OrderController');
const router = express.Router();
const passport = require('passport');



router.post('/',passport.authenticate('jwt'),newOrderController).get('/own',passport.authenticate('jwt'),userOrderController).patch('/sellers/:id',passport.authenticate('jwt'),updateOrderSellerSideController).get('/sellers/:id',passport.authenticate('jwt') , fetchSellerOrders).get('/sellers/total-orders/:id',passport.authenticate('jwt'), fetchTotalOrers).get('/braintree/token',passport.authenticate('jwt'),braintreeTokenController).post('/braintree/payment',passport.authenticate('jwt',braintreePaymentController))

exports.router = router;