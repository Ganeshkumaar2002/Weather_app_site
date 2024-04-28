import { globalVariables } from './index.js'
import { changeDateFormat } from './unitFunctions.js'

/**
 * @param {string} city name of the city
 * updates the clock in the top section every second
 */
export function updateTopClock (city) {
  const meridian = document.getElementById('forecast-time-meridian')

  const clock = globalVariables.cityDates.get(city)

  globalVariables.timerId = setInterval(() => {
    if (clock.getHours() % 12 === 0) {
      meridianChangeOnTopClock(clock, meridian)
    }

    document.getElementsByClassName('forecast-hour')[0].innerHTML = String(clock.getHours() % 12 || 12).padStart(2, '0') + ':' + String(clock.getMinutes()).padStart(2, '0')
    document.getElementsByClassName('forecast-sec')[0].innerHTML = ': ' + String(clock.getSeconds()).padStart(2, '0')
  }, 1000)
}

/**
 * @param {Date} clock date object of the city
 * @param {object} meridian dom object where meridian is present in the top clock
 */
function meridianChangeOnTopClock (clock, meridian) {
  if (clock.getHours() === 12) {
    meridian.src = './Assets/HTM&CSS/General_Images_&_Icons/pmState.svg'
  } else {
    meridian.src = './Assets/HTM&CSS/General_Images_&_Icons/amState.svg'
    document.getElementsByClassName('forecast-date')[0].innerHTML = changeDateFormat((clock.getMonth() + 1) + '/' + clock.getDate() + '/' + clock.getFullYear())
  }
}

/**
 * creates cityDates for each city and updates it
 */
export function runCityDates () {
  updateCardAndTileTime()
  setInterval(updateCardAndTileTime, 1000)
}

/**
 * updates time on cards and tiles
 */
function updateCardAndTileTime () {
  for (const i of globalVariables.cityNames) {
    const cityDate = globalVariables.cityDates.get(i)
    cityDate.setSeconds(cityDate.getSeconds() + 1)
  }
  updateCardsTime()
  updateTileTime()
}

/**
 * updates the card dates and display the updated card time and dates every minute
 */
function updateCardsTime () {
  for (const i of globalVariables.displayedCards.slice(0, document.querySelector('.preference-icons input').value)) {
    const card = document.getElementById(`${i}-card`)
    const cityDate = globalVariables.cityDates.get(i)
    let meridian
    if (cityDate.getHours() >= 12) {
      meridian = 'PM'
    } else {
      meridian = 'AM'
      card.getElementsByClassName('card-time-date')[1].innerHTML = changeDateFormat((cityDate.getMonth() + 1) + '/' + cityDate.getDate() + '/' + cityDate.getFullYear())
    }
    card.getElementsByClassName('card-time-date')[0].innerHTML = String(cityDate.getHours() % 12 || 12).padStart(2, '0') + ':' + String(cityDate.getMinutes()).padStart(2, '0') + ' ' + meridian
  }
}

/**
 * update time for each tile
 */
function updateTileTime () {
  for (const i of globalVariables.displayedTiles.slice(0, 12)) {
    const tile = document.getElementById(`${i}-tile`)
    const cityDate = globalVariables.cityDates.get(i)
    let meridian
    if (cityDate.getHours() >= 12) {
      meridian = 'PM'
    } else {
      meridian = 'AM'
    }
    tile.getElementsByClassName('tile-time')[0].innerHTML = String(cityDate.getHours() % 12 || 12).padStart(2, '0') + ':' + String(cityDate.getMinutes()).padStart(2, '0') + ' ' + meridian
  }
}

/**
 * @param {string} city name of the city
 * @returns {Date} date object for the particular city
 */
export function liveDateAndTimeOfCity (city) {
  return globalVariables.cityDates.get(city).toLocaleString()
}
