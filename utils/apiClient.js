const axios = require('axios');

const LANGGRAPH_API_URL = process.env.LANGGRAPH_API_URL || 'http://localhost:8001/generate';

class ApiClient {
  /**
   * Send user question to Langgraph chatbot API and extract the reply.
   * @param {string} question - User's question.
   * @param {number} userId - User ID.
   * @returns {Promise<{success: boolean, message: string}>}
   */
  static async sendMessage(question, userId) {
    try {
      // Prepare POST body
      const payload = {
        question: question,
        user_id: userId,
        thread_id: 1 // always 1 as an example
      };

      // Convert payload to JSON to calculate Content-Length
      //const jsonPayload = JSON.stringify(payload);
      //const contentLength = Buffer.byteLength(jsonPayload);

      // Make POST request
      const response = await axios.post(LANGGRAPH_API_URL, payload, {
        headers: {
          //'Cache-Control': 'no-cache',
          'Content-Type': 'application/json',
          //'Content-Length': contentLength, 
          //'Host': new URL(LANGGRAPH_API_URL).host,
          //'Host': 'localhost:8001'          
        }
      });

      const data = response.data;

      // Validate response format
      if (!data || !Array.isArray(data.result) || data.result.length === 0) {
        return {
          success: false,
          message: 'Invalid response format from chatbot API.'
        };
      }

      // Filter objects that have "chatbot" key
      const chatbotObjects = data.result.filter(item => item.hasOwnProperty('chatbot'));
      if (chatbotObjects.length === 0) {
        return {
          success: false,
          message: 'No chatbot response found in API result.'
        };
      }

      const lastChatbotObj = chatbotObjects[chatbotObjects.length - 1].chatbot;

      // Extract messages array
      if (!lastChatbotObj.messages || !Array.isArray(lastChatbotObj.messages) || lastChatbotObj.messages.length === 0) {
        return {
          success: false,
          message: 'No messages found in chatbot response.'
        };
      }

      // Get last content string from messages array
      const lastMessage = lastChatbotObj.messages[lastChatbotObj.messages.length - 1];
      if (!lastMessage.content) {
        return {
          success: false,
          message: 'Chatbot message content missing.'
        };
      }

      return {
        success: true,
        message: lastMessage.content
      };

    } catch (error) {
      console.error('Langgraph API call failed:', error.message || error);
      return {
        success: false,
        message: 'Failed to connect to chatbot API.'
      };
    }
  }
}

module.exports = ApiClient;
