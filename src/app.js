const path = require('path')
const express = require("express");
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express();

// Define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Mohammed Modather'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Mohammed Modather'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Mohammed Modather',
    helpText: 'This is some helpful text' 
  })
})

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide an address!'
    })
  }
  geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
    if (error) {
      return res.send({
        error
      })
    }
    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        })
      }
      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
      })
    })
  })
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    errorMessage: 'Help article not found',
    name: 'Mohammed Modather',
    title: '404'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found',
    name: 'Mohammed Modather',
    title: '404'
  })
})

app.listen(3000, () => {
  console.log("Server is up and running on port 3000");
});
