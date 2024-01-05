const express = require('express');
const { newOrderController, userOrderController, fetchSellerOrders, updateOrderSellerSideController, fetchTotalOrers } = require('../controllers/OrderController');
const router = express.Router();
const passport = require('passport');
router.post('/',passport.authenticate('jwt'),newOrderController).get('/own',passport.authenticate('jwt'),userOrderController).patch('/sellers/:id',passport.authenticate('jwt'),updateOrderSellerSideController).get('/sellers/:id',passport.authenticate('jwt') , fetchSellerOrders).get('/sellers/total-orders/:id',passport.authenticate('jwt'), fetchTotalOrers)

exports.router = router;