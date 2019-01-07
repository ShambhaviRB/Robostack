const express = require('express');
const router = express.Router();
const passport = require('passport');

const user_controller = require('../controllers/user');

router.post('/register', user_controller.user_register);
router.post('/login', user_controller.user_login);
module.exports = router;
