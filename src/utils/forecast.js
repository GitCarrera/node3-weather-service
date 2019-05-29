const request = require('request')

const forecast = (lat, long, callback) =>{
const url ='https://api.darksky.net/forecast/eb414d590a0623fe46221a167b746902/'+lat+','+long+'?lang=en'

  request({ url: url, json:true }, (error, {body})=>{
    
    if(error){
      callback('Unable to connect to weather service', undefined)
    } else if (body.error) {
      callback(body.error, undefined)
    }else {
      
    callback(undefined,body.daily.data[0].summary + 
      ' It is currently '+body.currently.temperature+' degrees out. '+ 
      'There is ' + body.currently.precipProbability * 100 + '% chance of rain.'  + 
    ' The high today is ' + body.daily.data[0].temperatureHigh+ ' with a low of ' + 
    body.daily.data[0].temperatureLow+'. The windspeed is '+ body.currently.windSpeed) + '.'
     
    }

  })

}




module.exports = forecast