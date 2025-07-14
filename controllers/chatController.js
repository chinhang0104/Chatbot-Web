const apiClient = require('../utils/apiClient');
const ChatHistory = require('../models/ChatHistory');

exports.chatPage = async (req, res) => {
  try {
    const chatHistory = await ChatHistory.findByUserId(req.session.user.id);
    res.render('chat', {
      user: req.session.user,
      chatHistory: chatHistory || []
    });
  } catch (error) {
    console.error(error);
    res.render('chat', {
      user: req.session.user,
      chatHistory: []
    });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.session.user.id;

    // Save user message
    await ChatHistory.saveMessage(userId, message, 'user');

    // Call Langgraph REST API with user_id and thread_id=1
    const botResponse = await apiClient.sendMessage(message, userId);

    if (!botResponse.success) {
      return res.status(500).json({
        success: false,
        error: botResponse.message || 'Chatbot API error'
      });
    }

    // Save bot response
    await ChatHistory.saveMessage(userId, botResponse.message, 'bot');

    res.json({
      success: true,
      userMessage: message,
      botResponse: botResponse.message
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message'
    });
  }
};
