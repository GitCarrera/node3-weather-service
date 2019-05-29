const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000


//Define path for Express config 
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set ('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'DC'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'DC'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'DC',
    message: 'You need help because you are weak!'
  })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
    return res.send({
      error: 'You must provide an address'

    })
  }
  
  var address = req.query.address
  geocode(address , (error, {latitude, longitude, location} = {}) => {
    if(error){
      return res.send({error})
    }
  
    forecast(latitude, longitude, (error, forecastData) =>{
      if(error){
        return res.send({error})
      }
      res.send({
        forecast: forecastData,
        location,
        address
      })
    })
  })

 
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: "I can't help you - 404",
    name: 'DC',
    message: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Something is wrong, 404',
    name: 'DC',
    message: 'You are wrong, this address you entered does not exist!'
  })
})

app.listen(port, () => {
  console.log('Server is listening on port ' + port)
})