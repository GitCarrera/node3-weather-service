const request = require('request')
const geocode = (address, callback) => {
  //encodeURIComponent is used to sanitize the url cahracters
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2FycmVyYWRhbiIsImEiOiJjanZyZTE5bzgybzB1NDhwYm10ODV6NDhqIn0.tRH-9VAGVrJ4kTSHoC0FOQ&limit=1'

  request({url: url, json:true}, (error, { body }) => {
    if(error){
      callback('Unable to connect to geo code service', undefined)
    }else if(body.features.length === 0){
    callback('Error in address sent, no geocodes found', undefined)
   }else{
    callback(undefined, {
      latitude: body.features[0].center[1],
      longitude: body.features[0].center[0],
      location: body.features[0].place_name
    })
    }
  })
}

module.exports = geocode