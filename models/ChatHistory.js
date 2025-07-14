// In a real application, this would connect to a database
const chatHistory = [];

class ChatHistory {
    static async findByUserId(userId) {
        return chatHistory.filter(chat => chat.userId === userId);
    }

    static async saveMessage(userId, message, sender) {
        const chatMessage = {
            id: chatHistory.length + 1,
            userId: userId,
            message: message,
            sender: sender,
            timestamp: new Date()
        };
        chatHistory.push(chatMessage);
        return chatMessage;
    }
}

module.exports = ChatHistory;
