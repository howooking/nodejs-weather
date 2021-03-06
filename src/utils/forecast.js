const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=b57f345ed3832366cee44fcbbbb5047d&query='+longitude+','+latitude+'&units=m'
  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('Check internet', undefined)
    } else if (body.error) {
      callback('Please specify a valid location identifier using the query parameter.', undefined)
    } else {
      const data = body.current;
      callback(undefined, `${data.weather_descriptions[0]}. 현재 기온은 ${data.temperature}도이며. 체감 온도는 ${data.feelslike}도입니다..`)
    }
  })
}

module.exports = forecast