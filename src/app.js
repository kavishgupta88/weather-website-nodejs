const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs')
const path = require('path')
const express = require('express')
const app = express()

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const registerPath = path.join(__dirname, '../templates/partials')
//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(registerPath)



//Setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather App',
        name: 'Kavish Gupta'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kavish Gupta'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Kavish Gupta',
        message: 'This is 24/7 helpline page.'
    })
})


app.get('/weather', (req, res)=>{
    if(!req.query.address) {
        return res.send({
            error: 'You must enter the address!'
        })
    }else {
        geocode(req.query.address, (error, {lattitude, longitude, location} = {})=> {
            if(error) {
               return res.send({
                   error: 'No such address found!'
               })
            }
            
            forecast(lattitude, longitude, (error, forecastData) => {
              if(error) {
                  return es.send({
                    error: 'No such latitude and longitude found!'
                })
              }
              res.send({
                forecast: forecastData,
                location: location,
                address:  req.query.address
            })
              
              
              
            })
            
            
        })
        
    }
    
    
})

app.get('/products', (req,res)=> {
    if(!req.query.search) {
       return res.send({
            error: 'You must provide a search item!'
        })
    }
    
    console.log(req.query.search)
    res.send( {
        products: []
    })
})
app.get('/help/*', (req,res)=> {
    res.render('Error404', {
        title: '404',
        name: 'Kavish Gupta',
        errorMessage: 'Help Article Not Found!'
    })
})

app.get('*', (req,res)=> {
    res.render('Error404', {
        title: '404',
        name: 'Kavish Gupta',
        errorMessage: 'Page Not Found!'
    })
})

app.listen(3000, ()=> {
    console.log('Server started on Port 3000.')
})