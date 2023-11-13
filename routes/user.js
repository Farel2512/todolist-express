const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/UserController');
const { authenticateUser } = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
