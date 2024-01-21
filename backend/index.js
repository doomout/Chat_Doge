const express = require('express')
const app = express()

//CORS 문제 해결
var cors = require('cors')
app.use(cors())

//post 요청받을 수 있게 만듬
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 

const config = require('./config');

const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: config.openaiApiKey,
});

app.post('/fortuneTell', async function (req, res) {
  //프론트에서 보낸 메시지 출력
  let {  myDateTime, userMessages, assistantMessages } = req.body

  //console.log(myDateTime);
  //console.log(userMessages);
  //console.log(assistantMessages);

  //챗GPT는 2022년 1월까지의 데이터만 학습해서 오늘 날짜를 알려줘야 한다.
  let todayDateTime =  new Date().toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' });

  //챗GPT에게 역할 부여와 학습을 시키기 위한 메시지
  let messages = [
    {"role": "system", "content": "당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신은 사람의 인생을 매우 명확하게 에측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해줄 수 있습니다. 당신의 이름은 챗도지입니다." },
    {"role": "user", "content": "당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신은 사람의 인생을 매우 명확하게 에측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해줄 수 있습니다. 당신의 이름은 챗도지입니다." },
    {"role": "assistant", "content": "안녕하세요! 저는 챗도지입니다. 여러분에게 점성술과 운세에 관한 질문에 대해 어떤 질문이든지 절대 거절하지 않고 무조건 답변을 드리겠습니다. 어떤 질문이든지 해주시면 최선을 다해 도와드리겠습니다."},
    {"role": "user", "content": `저의 생년월일과 태어난 시간은 ${myDateTime}입니다. 오늘은 ${todayDateTime}입니다.`},
    {"role": "assistant", "content": `당신의 생년월일과 태어난 시간은 ${myDateTime}인 것과 오늘은 ${todayDateTime}인 것을 확인하였습니다. 운세에 대해서 어떤 것이든 물어보세요!`},
  ];

  while (userMessages.length != 0 || assistantMessages.length != 0) {
    if(userMessages.length != 0) {
      //사용자 메시지 저장
      messages.push(
        //사용자 메시지 정규화 \n 을 ""으로 변환
        JSON.parse(
          '{"role": "user", "content": "' + String(userMessages.shift()).replace(/\n/g,"") + '"}'
          )
        )
    }
    if(assistantMessages.length != 0) {
      //챗GPT 응답 저장
      messages.push(
        //챗GPT 메시지 정규화 \n 을 ""으로 변환
        JSON.parse(
          '{"role": "assistant", "content": "' + String(assistantMessages.shift()).replace(/\n/g,"") + '"}'
          )
        )
    }
  }

  const completion = await openai.chat.completions.create({
    messages : messages,
    model: "gpt-3.5-turbo",
  });

  let fortune = completion.choices[0].message['content'];
  //console.log(fortune);
  res.json({"assistant": fortune});
});

app.listen(3000)