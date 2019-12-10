const request = require('request')

const forecast =  (lattitude, longitude, callback) => {
   const url = "https://api.darksky.net/forecast/f2c0a14230adc8f43f1f5336b944ec09/"+lattitude+","+longitude+"?units=si"

    request({url, json: true}, (error, {body})=> {

        if(error) {
            callback('Unable to connect to weather service!. Please check the Network!', undefined)
        }else if(body.error) {
            callback('Unable to find the location. Please try another search!', undefined)

        }else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + ' % chance of rain. Todays highest temprature is ' + body.daily.data[0].temperatureHigh + '. Todays lowest temprature is '+ body.daily.data[0].temperatureLow )
            
        }
    })

}

module.exports = forecast