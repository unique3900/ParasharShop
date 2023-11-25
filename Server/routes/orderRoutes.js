const express = require('express');
const { newOrderController, userOrderController, fetchSellerOrders, updateOrderSellerSideController } = require('../controllers/OrderController');
const router = express.Router();

router.post('/',newOrderController).get('/:id',userOrderController).patch('/sellers/:id',updateOrderSellerSideController).get('/sellers/:id',fetchSellerOrders)

exports.router = router;