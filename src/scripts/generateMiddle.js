import { globalVariables } from './index.js'

import { actionOnCardsScroll, fitCards } from './listenerFunctions.js'

import { liveDateAndTimeOfCity } from './timeUpdates.js'

import { fillContentTop } from './generateTop.js'

import { changeDateFormat, changeTimeFormat, choosePreferenceDivisionNumber, chooseTempCategoryOfCard } from './unitFunctions.js'

/**
 * @param {string} preference the selected preference
 * changes the indicator based on the preference
 */
export function changePreferenceIndicator (preference) {
  const divisionNumber = choosePreferenceDivisionNumber(preference)
  const preferenceDivisions = document.querySelectorAll('.preference-icons div')

  for (let i = 0; i < 3; i++) {
    if (i === divisionNumber) {
      preferenceDivisions[i].classList.add('indicator')
    } else {
      preferenceDivisions[i].classList.remove('indicator')
    }
  }
}

/**
 * @param {Array} filteredCities array of filtered cities
 * @param {string} preference the selected preference
 * @returns {Array} sorted array based on the preference
 */
export function sortCityCards (filteredCities, preference) {
  filteredCities.sort((a, b) => {
    let propertyOne, propertyTwo

    if (preference === 'sunny') {
      propertyOne = parseInt(globalVariables.coreData[a].temperature.slice(0, -2))
      propertyTwo = parseInt(globalVariables.coreData[b].temperature.slice(0, -2))
    }

    if (preference === 'snowflake') {
      propertyOne = parseInt(globalVariables.coreData[a].precipitation.slice(0, -1))
      propertyTwo = parseInt(globalVariables.coreData[b].precipitation.slice(0, -1))
    }
    if (preference === 'rainy') {
      propertyOne = parseInt(globalVariables.coreData[a].humidity.slice(0, -1))
      propertyTwo = parseInt(globalVariables.coreData[b].humidity.slice(0, -1))
    }

    if (propertyOne > propertyTwo) return -1

    if (propertyOne < propertyTwo) return 1
    return 0
  })

  return filteredCities
}

/**
 * @param {Array} cardCities array of city names to be filled in the cards section
 * fills the cards section with the given city cards
 */
export function generateMiddleCards (cardCities) {
  const cardContainer = document.getElementsByClassName('cards-container')[0]
  cardContainer.innerHTML = ''

  if (cardCities.length === 0) {
    cardContainer.innerHTML += 'Sorry, no city in this category right now'
  }

  let cityData
  let dateAndTime

  let date, timeAndMeridian
  let time, meridian, tempCategoryOfCard
  let rotateIcon

  for (const city of cardCities) {
    cityData = globalVariables.coreData[city]
    tempCategoryOfCard = chooseTempCategoryOfCard(cityData.temperature.slice(0, -2))

    if (tempCategoryOfCard !== 'rainy') {
      rotateIcon = 'rotate-x'
    }

    dateAndTime = liveDateAndTimeOfCity(city).split(',')
    date = dateAndTime[0]
    timeAndMeridian = dateAndTime[1].split(' ').slice(1, 3)

    time = changeTimeFormat(timeAndMeridian[0]).slice(0, 2)
    meridian = timeAndMeridian[1]

    cardContainer.innerHTML += `<div class="card" id="${city}-card" style="background-image:url('./Assets/HTM&CSS/Icons_for_cities/${city}.svg');">
    <div class="card-head">
        <div class="card-city">
            ${cityData.cityName}
        </div>
        <div class="card-temp">
            <img src="./Assets/HTM&CSS/Weather_Icons/${tempCategoryOfCard}Icon.svg" alt="" class="card-temp-icon ${rotateIcon}">
            ${cityData.temperature}
        </div>
    </div>
    <div class="card-time-date">
        ${time[0]}:${time[1]} ${meridian}
    </div>
    <div class="card-time-date">
        ${changeDateFormat(date)}
    </div>
    <div class="card-factors">
        <div>
            <img src="./Assets/HTM&CSS/Weather_Icons/humidityIcon.svg" alt="" class="card-factors-img">
        </div>
        <div class="card-factors-text">${cityData.humidity}</div>
    </div>
    <div class="card-factors">
        <div>
            <img src="./Assets/HTM&CSS/Weather_Icons/precipitationIcon.svg" alt="" class="card-factors-img">
        </div>
        <div class="card-factors-text">${cityData.precipitation}</div>
    </div>
</div>`
  }

  fitCards()
  actionOnCardsScroll.call(cardContainer)
  addCardListener()
}

/**
 * adds event listener for every card in middle section
 */
function addCardListener () {
  const cards = document.querySelectorAll('.card')
  cards.forEach((card) => {
    card.addEventListener('click', (cardClickEvent) => {
      const cityName = cardClickEvent.currentTarget.querySelector('.card-city').textContent.trim()
      if (cityName === document.getElementById('forecast-select').value) {
        return 0
      }
      clearInterval(globalVariables.timerId)
      document.getElementById('forecast-select').value = cityName
      fillContentTop(cityName.toLowerCase())
    })
  })
}
