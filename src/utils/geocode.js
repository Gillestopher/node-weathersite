const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmVhdGxlam9vY2UiLCJhIjoiY2p4YW1rN2J2MHlwdjNubnJ6emNpemI0ZiJ9.UzzRIr0bZ9o1kVlp_gC70g'

    request({ url, json: true }, (err, { body }) => {
        if (err || body.message) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location,try again!', undefined)
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