import { globalVariables, timelineBoxItems } from './index.js'
import { fitCards } from './listenerFunctions.js'

import { updateTopClock } from './timeUpdates.js'

import { changeDateFormat, changeTimeFormat, celsiusToFahrenheit, adjustTimelineTime, chooseTempImageOfTimeline } from './unitFunctions.js'

class topDataSections {
  constructor (city) {
    this.cityName = globalVariables.coreData[city].cityName
    this.temperature = globalVariables.coreData[city].temperature
    this.humidity = globalVariables.coreData[city].humidity
    this.precipitation = globalVariables.coreData[city].precipitation
    this.cityDate = globalVariables.cityDates.get(city)
  }

  changeCityTopImage () {
    document.getElementById('city-image').src = `./Assets/HTM&CSS/Icons_for_cities/${this.cityName.toLowerCase()}.svg`
  }

  fillTopTimeStamp () {
    let [date, time, meridian] = this.cityDate.toLocaleString().split(' ')
    date = date.slice(0, -1)
    fillTopDate(date)
    fillTopTime(time, meridian)

    updateTopClock(this.cityName.toLowerCase())
  }

  fillTopFactors () {
    const tempInFahrenheit = Math.round((parseInt(this.temperature) * 1.8) + 32)

    document.getElementById('factor-temp-c').innerHTML = this.temperature
    document.getElementById('factor-humidity').innerHTML = this.humidity
    document.getElementById('factor-precipitate').innerHTML = this.precipitation
    document.getElementById('factor-temp-f').innerHTML = tempInFahrenheit + '&deg F'
  }
}

/**
 * @param {string} cityName name of the city
 * @param {string} dateAndTime date and time of the city
 * @returns {Array} array of temperatures in the next five hours
 */
async function fetchTimeline (cityName, dateAndTime) {
  const requestBody = {
    city_Date_Time_Name: dateAndTime + ', ' + cityName,
    hours: 5
  }

  const response = await fetch('/hourly-forecast', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
  const nextFiveHrs = await response.json()
  return nextFiveHrs.temperature
}

/**
 * @param {string} city name of city in string
 * template object of a city
 */
class cityTimeline extends topDataSections {
  constructor (city) {
    super(city)
    this.dateAndTime = globalVariables.coreData[city].dateAndTime
    this.timeZone = globalVariables.coreData[city].timeZone
    this.nextFiveHrs = fetchTimeline(this.cityName, this.dateAndTime)
  }

  async fillTopTimeline () {
    const currentTemp = this.temperature.slice(0, -2)
    let [currentTime, currentMeridian] = this.cityDate.toLocaleString().split(' ').slice(1, 3)
    const nextHrsTemp = await this.nextFiveHrs

    let time = parseInt(currentTime.split(':')[0])
    let timeAndMeridian = adjustTimelineTime(time, currentMeridian)

    /**
     * for loop of timeline
     */
    function timelineForLoop () {
      for (let i = 0; i < 6; i++) {
        if (i === 0) {
          timelineBoxItems[i][0].innerHTML = 'NOW'
          timelineBoxItems[i][1].firstElementChild.src = `./Assets/HTM&CSS/Weather_Icons/${chooseTempImageOfTimeline(currentTemp)}.svg`
          timelineBoxItems[i][2].innerHTML = currentTemp
        } else {
          timelineBoxItems[i][0].innerHTML = `${time} ${currentMeridian}`
          timelineBoxItems[i][1].firstElementChild.src = `./Assets/HTM&CSS/Weather_Icons/${chooseTempImageOfTimeline(nextHrsTemp[i - 1].slice(0, -2))}.svg`
          timelineBoxItems[i][2].innerHTML = nextHrsTemp[i - 1].slice(0, -2)
        }
        /* this line is because grayscale filter is given in fillTopOnInvalid function */
        timelineBoxItems[i][1].firstElementChild.style = 'filter:none'
        time++
        timeAndMeridian = adjustTimelineTime(time, currentMeridian)
        time = timeAndMeridian[0]
        currentMeridian = timeAndMeridian[1]
      }
    }
    timelineForLoop()

    moveToSite()
  }
}

/**
 * moving from loader to site
 */
function moveToSite () {
  document.getElementsByClassName('loader')[0].style.display = 'none'
  document.getElementsByClassName('top-section')[0].style.display = 'block'
  document.getElementsByClassName('content')[0].style.display = 'block'

  fitCards()
}

/**
 *
 * @param {string} city city-name
 * changes the city image , date and time, factors and timeline
 */
export function fillContentTop (city) {
  const cityObject = new cityTimeline(city)

  cityObject.fillTopTimeStamp()
  cityObject.changeCityTopImage()
  cityObject.fillTopFactors()
  cityObject.fillTopTimeline()
}

/**
 *
 * @param {string} date date in a slash separated format m / d / y
 * fills day,month and year
 */
function fillTopDate (date) {
  const dateString = changeDateFormat(date)
  document.getElementsByClassName('forecast-date')[0].innerHTML = dateString
}

/**
 *
 * @param {string} time time in a : separated format hr:min:sec
 * @param {string}meridian am or pm
 * fills hours , minutes ,seconds and meridian forecast-time class
 */
function fillTopTime (time, meridian) {
  const [hr, min, sec] = changeTimeFormat(time)

  document.getElementsByClassName('forecast-hour')[0].innerHTML = hr + ':' + min
  document.getElementsByClassName('forecast-sec')[0].innerHTML = ': ' + sec

  if (meridian === 'AM') {
    document.getElementById('forecast-time-meridian').src = './Assets/HTM&CSS/General_Images_&_Icons/amState.svg'
  } else {
    document.getElementById('forecast-time-meridian').src = './Assets/HTM&CSS/General_Images_&_Icons/pmState.svg'
  }
}

/**
 * @param {string} city name of the city
 * @returns {Array} all four factors
 */
export function getAndCalculateFactors (city) {
  const tempInCelsius = parseInt(globalVariables.coreData[city].temperature.slice(0, -2))
  const humidity = parseInt(globalVariables.coreData[city].humidity.slice(0, -1))
  const precipitate = parseInt(globalVariables.coreData[city].precipitation.slice(0, -1))

  const tempInFahrenheit = celsiusToFahrenheit(tempInCelsius)
  return [tempInCelsius, humidity, precipitate, tempInFahrenheit]
}

/**
 *fill the top-section when the input is invalid
 */
export function fillTopOnInvalid () {
  alert('Invalid Input')

  document.getElementById('city-image').src = './Assets/HTM&CSS/General_Images_&_Icons/nil.svg'

  document.getElementsByClassName('forecast-hour')[0].innerHTML = '<div style="margin-top:35px;font-size:47px">NIL</div>'
  document.getElementsByClassName('forecast-sec')[0].innerHTML = ''
  document.getElementsByClassName('forecast-date')[0].innerHTML = ''
  document.getElementById('forecast-time-meridian').src = ''

  document.getElementById('factor-temp-c').innerHTML = 'NIL'
  document.getElementById('factor-temp-f').innerHTML = 'NIL'
  document.getElementById('factor-humidity').innerHTML = 'NIL'
  document.getElementById('factor-precipitate').innerHTML = 'NIL'

  for (let i = 0; i < 6; i++) {
    timelineBoxItems[i][0].innerHTML = 'NIL'
    timelineBoxItems[i][1].firstElementChild.src = './Assets/HTM&CSS/General_Images_&_Icons/nil.svg'
    timelineBoxItems[i][1].firstElementChild.style = 'height:21px; filter: grayscale(100%);'
    timelineBoxItems[i][2].innerHTML = 'NIL'
  }
}
