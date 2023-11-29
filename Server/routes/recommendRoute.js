const express = require('express');
const { recommendController } = require('../controllers/RecommendController');

const router = express.Router();

router.get('/:id', recommendController)


exports.router = router;