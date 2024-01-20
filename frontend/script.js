const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
async function sendFortuneRequest(userInput) {
    try {
        const response = await fetch("http://localhost:3000/fortuneTell", {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: userInput }),
        });

        if (!response.ok) {
            throw new Error('에러:' + response.status);
        }

        const data = await response.json();
        console.log('Response:', data.assistant);
        displayMessage(data.assistant, 'response');
    } catch (error) {
        console.error('에러:', error.message);
    }
}

function sendMessage() {
    const userInput = document.getElementById('message-input').value;
    if (userInput.trim() === '') return;

    displayMessage(userInput, 'user');
    document.getElementById('message-input').value = ''; // 입력 필드 비우기

    // 사용자가 메시지를 보낼 때 sendFortuneRequest 호출
    sendFortuneRequest(userInput);
}

function displayMessage(message, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}-message`;
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);

    // 새 메시지가 추가될 때 채팅창 하단으로 스크롤
    chatMessages.scrollTop = chatMessages.scrollHeight;
}