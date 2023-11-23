const express = require('express');
const { newOrderController, userOrderController, fetchSellerOrders } = require('../controllers/OrderController');
const router = express.Router();

router.post('/',newOrderController).get('/:id',userOrderController).patch('/:id').get('/sellers/:id',fetchSellerOrders)

exports.router = router;