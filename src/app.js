const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Define paths
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Chris G'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Chris G'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Chris G'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            err: 'You must provide an address'
        })
    }

    geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
        if (err) {
            return res.send({ err })
        }

        forecast(latitude, longitude, (err, forecastData) => {
            if (err) {
                return res.send({ err })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chris G',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chris G',
        errorMessage: 'Page not found!'
    })
})

app.listen(port, () => {
    console.log('Server running on port ' + port)
})