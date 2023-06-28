const express = require('express');
const { LoginController, RegisterController, currentUserController, sellerRegisterController } = require('../Controller/AuthController');
const { authMiddleware } = require('../Middleware/authMiddleware');
const router = express();


router.post('/register', RegisterController);
router.post('/login', LoginController);
router.get('/current-user', authMiddleware, currentUserController);
router.post('/seller-register',authMiddleware, sellerRegisterController);


module.exports = router;