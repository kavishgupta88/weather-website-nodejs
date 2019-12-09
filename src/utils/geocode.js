const request = require('request')

const geocode = (address, callback) => {
    url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1Ijoia2F2aXNoZ3VwdGE4OCIsImEiOiJjazMzOGVsdG0wYTBjM21wM3BreDh2a3FuIn0.WgEDbd1dclR85LMKepoZoQ"

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to the geocoding service! Please Check Network!', undefined)
        }else if(body.features.length ===0) {
            callback('Unable to search the location. Please try another search!')
        }else {
            callback(undefined, {
                lattitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name

            })
        }

    })

}

module.exports = geocode