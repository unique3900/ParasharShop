const express = require('express');
const { LoginController, RegisterController, currentUserController } = require('../Controller/AuthController');
const { authMiddleware } = require('../Middleware/authMiddleware');
const router = express();


router.post('/register', RegisterController);
router.post('/login', LoginController);
router.get('/current-user',authMiddleware,currentUserController)


module.exports = router;