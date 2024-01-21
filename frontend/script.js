//const express = require('express');
//const cors = require('cors');
//const app = express();

//app.use(cors());

//변수 생성
let userMessages = []; //사용자가 입력한 메세지
let assistantMessages = []; //챗GPT가 입력한 메시지

// OpenAI에 운세 요청을 보내고, 응답을 처리하는 함수
async function sendFortuneRequest(userInput) {
    try {
        const response = await fetch("http://localhost:3000/fortuneTell", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            //stringify() : 프런트 <-> 백엔드 간 json 형태의 데이터를 주고 받을 때 사용
            body: JSON.stringify({ 
                //name: userInput 
                userMessages: userMessages,
                assistantMessages : assistantMessages,
            }),
        });

        if (!response.ok) {
            throw new Error('에러:' + response.status);
        }

        const data = await response.json();
        console.log('Response:', data.assistant);

        // 채팅창에 챗 GPT의 응답 메시지 표시
        displayMessage(data.assistant, 'response');
    } catch (error) {
        console.error('에러:', error.message);
    }
}

function sendMessage() {
    //사용자의 메시지 가져옴
    const userInput = document.getElementById('message-input').value;
    if (userInput.trim() === '') return;

    //userMessages에 사용자의 메시지 저장
    userMessages.push(userInput.value);

    //화면 표시
    displayMessage(userInput, 'user');

    // 입력 필드 비우기
    document.getElementById('message-input').value = ''; 

    // 사용자가 메시지를 보낼 때 sendFortuneRequest 호출
    sendFortuneRequest(userInput);
}

function displayMessage(message, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}-message`;
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);

    //assistantMessages에 챗 GPT의 메시지 저장
    assistantMessages.push(message);

    // 새 메시지가 추가될 때 채팅창 하단으로 스크롤
    chatMessages.scrollTop = chatMessages.scrollHeight;
}