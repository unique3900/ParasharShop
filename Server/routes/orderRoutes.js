const express = require('express');
const { newOrderController, userOrderController } = require('../controllers/OrderController');
const router = express.Router();

router.post('/',newOrderController).get('/:id',userOrderController).patch('/:id')

exports.router = router;