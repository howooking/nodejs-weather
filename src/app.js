const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs') 
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath)) // //pulic 폴더를 root로 설정, index.html을 찾아서 routing해줌

app.get('', (req, res) => {
  res.render('index', {
    title: 'weather app',
    name: 'Howoo',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About howoo',
    name: 'Howoo',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help me',
    name: 'Howoo',
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: '지역을 입력하세요.'
    })
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
    if (error) {
      return res.send({ error })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
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
      error: '검색어를 입력하시오'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    error: 'not on page'
  })
})


app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    error: 'what are you doing here?'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})