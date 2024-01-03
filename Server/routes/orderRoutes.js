const express = require('express');
const { newOrderController, userOrderController, fetchSellerOrders, updateOrderSellerSideController, fetchTotalOrers } = require('../controllers/OrderController');
const router = express.Router();

router.post('/',newOrderController).get('/own',userOrderController).patch('/sellers/:id',updateOrderSellerSideController).get('/sellers/:id',fetchSellerOrders).get('/sellers/total-orders/:id',fetchTotalOrers)

exports.router = router;