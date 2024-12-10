import { GEMINI_API_KEY, SYSTEM_PROMPT } from './gemini-config.js';

class Chatbot {
    constructor() {
        this.context = [];
    }

    async processMessage(message) {
        try {
            const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': GEMINI_API_KEY
                },
                body: JSON.stringify({
                    contents: [{
                        role: 'user',
                        parts: [{ text: SYSTEM_PROMPT + "\n\nUser: " + message }]
                    }]
                })
            });

            const data = await response.json();
            if (data.candidates && data.candidates[0].content) {
                // Convert markdown to HTML
                let response = data.candidates[0].content.parts[0].text;
                response = response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Convert **text** to <strong>text</strong>
                response = response.replace(/\*(.*?)\*/g, '<em>$1</em>'); // Convert *text* to <em>text</em>
                return response;
            } else {
                return "I apologize, but I'm having trouble processing your request right now.";
            }

        } catch (error) {
            console.error('Error:', error);
            return "I apologize, but I'm having trouble connecting right now. Please try again later.";
        }
    }
}

// Initialize chatbot and UI elements
const chatbot = new Chatbot();
const chatFab = document.getElementById('chatFab');
const chatWidget = document.getElementById('chatWidget');
const chatClose = document.getElementById('chatClose');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendMessage');
const chatMessages = document.getElementById('chatMessages');

// Toggle chat widget
chatFab.addEventListener('click', () => {
    chatWidget.classList.add('active');
    if (chatMessages.children.length === 0) {
        // Only add welcome message if it's the first time opening
        addMessage('bot', "Hi! I'm Vicky, Sri's AI assistant. How can I help you today? 👋");
    }
});

chatClose.addEventListener('click', () => {
    chatWidget.classList.remove('active');
});

// Update the sendMessage function to be async
async function sendMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;

    // Add user message
    addMessage('user', message);
    
    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-message bot typing';
    typingIndicator.innerHTML = '<div class="message-content">Typing...</div>';
    chatMessages.appendChild(typingIndicator);
    
    try {
        // Get bot response
        const response = await chatbot.processMessage(message);
        
        // Remove typing indicator
        typingIndicator.remove();
        
        // Add bot response
        addMessage('bot', response);
    } catch (error) {
        typingIndicator.remove();
        addMessage('bot', "I apologize, but I'm having trouble connecting right now. Please try again later.");
    }

    // Clear input
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add message to chat
function addMessage(type, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            ${content}
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Update event listeners to handle async function
sendButton.addEventListener('click', () => sendMessage());
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
