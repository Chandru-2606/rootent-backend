const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/me', protect, userController.getMe);

router.get('/', protect,  userController.getUsers);
router.get('/:id', protect,  userController.getUser);



module.exports = router; 