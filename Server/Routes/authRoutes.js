const express = require('express');
const { LoginController, RegisterController } = require('../Controller/AuthController');
const router = express();


router.post('/register', RegisterController);
router.post('/login', LoginController);


module.exports = router;