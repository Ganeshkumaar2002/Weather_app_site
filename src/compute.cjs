const api = require('get-weather-forecast-webtips')

process.on('message', function (req) {
  if (req[0] === 'all-timezone-cities') {
    process.send([api.allTimeZones()])
  } else if (req[0] === 'hourly-forecast') {
    process.send([api.nextNHoursWeather(req[1], req[2], req[3] || api.allTimeZones())])
  }
})
