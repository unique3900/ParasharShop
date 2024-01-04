const express = require('express');
const { newOrderController, userOrderController, fetchSellerOrders, updateOrderSellerSideController, fetchTotalOrers } = require('../controllers/OrderController');
const router = express.Router();
const passport = require('passport');
router.post('/',passport.authenticate('jwt'),newOrderController).get('/own',passport.authenticate('jwt'),userOrderController).patch('/sellers/:id',updateOrderSellerSideController).get('/sellers/:id',fetchSellerOrders).get('/sellers/total-orders/:id',fetchTotalOrers)

exports.router = router;