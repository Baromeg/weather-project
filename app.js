const express = require('express')
const https = require('https')
const app = express()

app.use(express.urlencoded({ extended: true }))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.post('/', function (req, res) {
  const query = req.body.cityName
  const units = 'metric'
  const appid = '6ee9037d0b2c17ae0c64a60f219aac64'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${units}&appid=${appid}`
  https.get(url, function (response) {
    console.log(response.statusCode)

    response.on('data', function (data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
      res.write(
        '<h1>Temperture in ' + query + ' is ' + temp + ' degrees celcius</h1>'
      )
      res.write('<p>The weather is ' + weatherDescription + '</p>')
      res.write(
        '<img src="' + imageURL + '" alt="' + weatherDescription + '"/>'
      )
      res.send()
    })
  })
})

app.listen(3000, function () {
  console.log('Server is running on port 3000...')
})
