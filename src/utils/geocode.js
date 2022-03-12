const request = require('postman-request');

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoianVuc2drIiwiYSI6ImNsMGw0MzdobTBzczMzY3VvaDM4OGEzbHAifQ.d_Jno-0nO-gU4upeZiwFWg&limit=1'
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('Check internet', undefined)
    } else if (body.features.length === 0) {
      callback('Check location', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode