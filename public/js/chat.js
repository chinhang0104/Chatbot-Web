document.addEventListener('DOMContentLoaded', function() {
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');

    chatForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const message = messageInput.value.trim();
        if (!message) return;

        // Display user message
        addMessage(message, 'user');
        messageInput.value = '';

        try {
            const response = await fetch('/chat/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });

            const data = await response.json();
            
            if (data.success) {
                addMessage(data.botResponse, 'bot');
            } else {
                addMessage('Sorry, there was an error processing your message.', 'bot');
            }
        } catch (error) {
            console.error('Error:', error);
            addMessage('Sorry, there was an error connecting to the server.', 'bot');
        }
    });

    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = message;
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = new Date().toLocaleTimeString();
        
        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(messageTime);
        chatMessages.appendChild(messageDiv);
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
