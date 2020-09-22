const path = require('path');
const express = require('express');
const hbs = require('hbs')

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// dwfine path for express config
const publicDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// setup hbs engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// setup static dir to serve static files
app.use(express.static(publicDirPath));

app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Ash'  
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About us",
        name:'Ash'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        msg:'How can i help you ?',
        name:'Ash'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide a address'
        })
    }
    geocode(req.query.address,(error,{lat,log,location}={})=>{
        if(error){
            return res.send({error});
        }
        forecast(lat,log,(error,forecast)=>{
            if(error){
                return res.send({error});
            }
            
            res.send({forecast,location,address:req.query.address});
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        error:'Help article not found',
        name:'Ash'
    })
})

app.get('/products',(req,res)=>{
    console.log(req.query.search)
    if(!req.query.search){
        return res.send(
            'Please provide a search term'
        )}
    res.send(
        {
            products:[req.query.search]
        }
    )
})  

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        error:'Page not found',
        name:'Ash'
    })
})

app.listen(3000,()=>{
    console.log('Server running....3000')
})