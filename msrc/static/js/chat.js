const chatContainer = document.getElementById('chatContainer');
const messageInput = document.getElementById('messageInput');

function sendMessage() {
    const userMessage = messageInput.value.trim();
    if (userMessage) {
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'message sent';
        userMessageDiv.innerHTML = `<img src="https://i.im.ge/2024/11/04/kHrN1F.user-min.png" alt="User"> ${userMessage}`;
        chatContainer.appendChild(userMessageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        const newMessage = messageInput.value;
        messageInput.value = '';
        showTypingIndicator();
        setTimeout(addMessage(newMessage), 500);
    }
}

function prt() {
    setTimeout(() => {
        window.open('https://shiv09.netlify.app/', '_blank');
    }, 400);
}

function showTypingIndicator() {
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message received typing-indicator';
    typingIndicator.innerHTML = `<img src="https://i.im.ge/2024/11/04/kHrmyz.bot-min.png" alt="Bot"> typing...`;
    typingIndicator.id = 'typingIndicator';
    chatContainer.appendChild(typingIndicator);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}


function appendMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message received';
    messageDiv.innerHTML = `<img src="https://i.im.ge/2024/11/04/kHrmyz.bot-min.png"> ${message}`;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}


function addMessage(userMessage) {
    const typingIndicator = document.getElementById('typingIndicator');

    fetch(`/getData?mes=${userMessage}`)
        .then(response => {
            if (typingIndicator) {
                typingIndicator.remove();
            }
            return response.json()
        })
        .then(data => appendMessage(data.cnt))
        .catch(error => {
            const errMes = "I'm having trouble understanding the message";
            console.log(error);
            appendMessage(errMes)
        })
}

messageInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});
