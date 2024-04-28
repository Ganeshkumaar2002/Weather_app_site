const express = require('express')
const bodyParser = require('body-parser')

const { fork } = require('child_process')

const app = express()
const port = 3000

let allCityTimezone

// To serve the static files
app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/all-timezone-cities', (req, res) => {
  const child = fork('./compute.cjs')
  child.send(['all-timezone-cities'])

  child.on('message', function (message) {
    allCityTimezone = message[0]
    res.status(200).json(allCityTimezone)
    console.log('all city data sent successfully ')
  })
})

app.post('/hourly-forecast', (req, res) => {
  const child = fork('./compute.cjs')
  const cityClock = req.body.city_Date_Time_Name
  const hours = req.body.hours

  let nextHoursTemp
  if (cityClock && hours) {
    child.send(['hourly-forecast', cityClock, hours, allCityTimezone])
    child.on('message', function (message) {
      nextHoursTemp = message[0]
      res
        .status(200)
        .json(nextHoursTemp)
      console.log('temperature of next five hours sent successfully')
    })
  } else {
    res
      .status(400)
      .json({ Error: 'Not a valid EndPoint, please check API doc' })
  }
})

app.listen(port, () => console.log(`App is listening on ${port}`))
