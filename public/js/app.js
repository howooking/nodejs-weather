//URL의 JSON자료를 가져오는 법
// fetch('http://localhost:3000/weather?address=은행동').then((response) => { //then은 나중에 배울거(promise개념)
//   response.json().then((data) => {
//     if (data.error) {
//       console.log(data.error)
//     } else {
//       console.log(data.location)
//       console.log(data.forecast)
//     }
//   })
// })
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#m1')
const messageTwo = document.querySelector('#m2')


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()//새로고침안함
  const location = search.value
  messageOne.innerHTML = '데이터 가져오는 중'
  messageTwo.innerHTML = '' //전에 검색했던 기록 없에기
  fetch(`http://localhost:3000/weather?address=${location}`).then((response) => { //then은 나중에 배울거(promise개념)
    response.json().then((data) => {
      if (data.error) {
        messageOne.innerHTML = data.error
      } else {
        messageOne.innerHTML = data.location
        messageTwo.innerHTML = data.forecast
      }
    })
  })
})