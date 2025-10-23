function sendMessage() {
    const inputElement = document.getElementById('messageInput');
    const messageText = inputElement.value.trim();

    if (messageText === '') return;

    displayMessage('user', messageText);

    fetch('/get_response', {
        method: 'POST',
        body: JSON.stringify({ message: messageText }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        displayMessage('assistant', data.message);
    });

    inputElement.value = '';
}

function displayMessage(sender, text) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerText = text;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
