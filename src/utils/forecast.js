const request = require('request')

const forecast = (lat,long,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=182d2494e413fed92bcbba8a428c380f&query=${lat},${long}&unit=m`;
    request({url,json:true},(error,{body})=>{
    if (error){
        callback('Unable to connect to weather sevices',undefined);
    } else if(body.error){
        callback('Please enter a valid location',undefined);
    } else{
        callback(undefined,(`Currently ${body.current.weather_descriptions[0]}, with temprature of ${body.current.temperature}&#8451; but it feelslike ${body.current.feelslike}&#8451;`));
    }
})
}

module.exports = forecast