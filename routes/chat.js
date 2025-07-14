const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware.requireAuth, chatController.chatPage);
router.post('/send', authMiddleware.requireAuth, chatController.sendMessage);

module.exports = router;
