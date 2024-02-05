# 챗GPT를 이용한 웹 서비스 만들기
- 참고 도서 : 조코딩의 챗GPT API를 활용한 수익형 웹 서비스 만들기
- 개발 환경  
vscode  
Node.js 20.11.0(https://nodejs.org/en)  
OpenAI API (https://www.npmjs.com/package/openai)  
챗GPT 문서 (https://platform.openai.com/docs/api-reference/chat/create)  
Express (https://www.npmjs.com/package/express)  
무료 아이콘 (https://fontawesome.com/search?q=loding&o=r&m=free)  
카카오 애드핏(https://adfit.kakao.com/info)

-개발 중 이슈(생길 때 마다 추가)-
1. openai의 api keys는 깃 허브에 올라갈 시 자동으로 키가 삭제된다.(재발급 받고 깃허브에 푸쉬 막음)
2. 이미지는 엣지 브라우저에서 image Creator from Designer 을 이용하여 생성
3. 챗GPT는 2022년 1월까지의 데이터만 학습해서 오늘 날짜를 알려줘야 한다.
```js
   let todayDateTime = new Date().toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul'});  
```
4. aws, 애드핏, 토스는 적용 안함. 
