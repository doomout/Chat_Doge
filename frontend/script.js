let userMessages = []; //사용자가 입력한 메세지
let assistantMessages = []; //챗GPT가 입력한 메시지
let myDateTime = ''

function start() {
    const date = document.getElementById('date').value;
    const hour = document.getElementById('hour').value;
    if (date === '') {
        alert('생년월일을 입력해주세요.');
        return;
    }
    myDateTime = date + hour;

    document.getElementById("intro").style.display = "none";
    document.getElementById("chat").style.display = "block";
}

async function sendMessage() {
    //로딩 아이콘  보여주기
    document.getElementById('loader').style.display = "block";

    //사용자의 메시지 가져옴
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    //채팅 말풍선에 사용자의 메시지 출력
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble user-bubble';
    userBubble.textContent = message;
    document.getElementById('fortuneResponse').appendChild(userBubble);

    //push
    userMessages.push(messageInput.value);

    //입력 필드 초기화
    messageInput.value = '';

    //백엔드 서버에 메시지를 보내고 응답 출력
    try {
        const response = await fetch("http://localhost:3000/fortuneTell", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            //stringify() : 프런트 <-> 백엔드 간 json 형태의 데이터를 주고 받을 때 사용
            body: JSON.stringify({ 
                myDateTime : myDateTime,
                userMessages: userMessages,
                assistantMessages : assistantMessages,
            })
        });

        if (!response.ok) {
            throw new Error('에러:' + response.status);
        }

        const data = await response.json();

        //로딩 아이콘  숨기기
        document.getElementById('loader').style.display = "none";
      
        //assistantMessage 메세지 추가
        assistantMessages.push(data.assistant);
        console.log('Response: ', data);

        //채팅 말풍선에 챗 GPT 응답 출력
        const botBubble = document.createElement('div');
        botBubble.className = 'chat-bubble bot-bubble';
        botBubble.textContent = data.assistant;
        document.getElementById('fortuneResponse').appendChild(botBubble);


    } catch (error) {
        console.error('에러:', error.message);
    }
};