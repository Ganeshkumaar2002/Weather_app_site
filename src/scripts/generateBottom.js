import { globalVariables, sortOptions } from './index.js'

import { liveDateAndTimeOfCity } from './timeUpdates.js'

import { changeTimeFormat } from './unitFunctions.js'
/**
 * @param {Array} tileCities array of cities in some order
 */
export function fillContentBottom (tileCities) {
  const tileContainer = document.getElementsByClassName('tile-container')[0]
  let dateAndTime
  let timeAndMeridian
  let time
  let meridian
  tileContainer.innerHTML = ''
  for (const city of tileCities.slice(0, 12)) {
    dateAndTime = liveDateAndTimeOfCity(city).split(',')
    timeAndMeridian = dateAndTime[1].split(' ').slice(1, 3)

    time = changeTimeFormat(timeAndMeridian[0]).slice(0, 2)
    meridian = timeAndMeridian[1]

    tileContainer.innerHTML += `                    
    <div class="tile" id="${city}-tile">
      <div class="tile-city-details">
          <div class="tile-continent">${globalVariables.coreData[city].timeZone.split('/')[0]}</div>
          <div class="tile-city-time">
              <span class="tile-city">${globalVariables.coreData[city].cityName}</span>
              , <span class="tile-time">${time[0]}:${time[1]} ${meridian}</span>
          </div>
      </div>
      <div class="tile-factors">
          <div class="tile-temp">${globalVariables.coreData[city].temperature.slice(0, -2)} &degC</div>
          <div class="tile-humidity">
              <img src="./Assets/HTM&CSS/Weather_Icons/humidityIcon.svg" alt="" class="tile-humidity-img">
              <span class="tile-humidity-text">${globalVariables.coreData[city].humidity}</span>
          </div>
      </div>
    </div>`
  }
}
/**
 * creates sorted array and fill them in the bottom section and assigns it to global displayed tiles
 */
export function fillSortedTiles () {
  const sortedTiles = sortingTiles()
  globalVariables.displayedTiles = sortedTiles
  fillContentBottom(globalVariables.displayedTiles)
}

/**
 * @returns {Array} array containing list of tiles to be displayed
 */
function sortingTiles () {
  const continentOption = sortOptions[0].classList.contains('indicator')
  const continentDescend = sortOptions[0].querySelector('img').classList.contains('descend')

  const temperatureOption = sortOptions[1].classList.contains('indicator')
  const temperatureDescend = sortOptions[1].querySelector('img').classList.contains('descend')

  if (!(continentOption || temperatureOption)) {
    return Object.keys(globalVariables.coreData)
  }

  let tiles = globalVariables.cityNames.slice()

  if (temperatureOption) {
    tiles = sortingTilesOnTemperature(tiles, temperatureDescend, continentOption, continentDescend)
  }

  if (continentOption) {
    tiles = sortingTilesOnContinent(tiles, continentDescend)
  }

  return tiles
}

/**
 * @param {Array} tiles array containing tiles
 * @param {boolean} temperatureDescend if temperature is in descending order
 * @param {boolean} continentOption if continent option on
 * @param {boolean} continentDescend if continent is in descending order
 * @returns {Array} array containing temperature sorted cities
 */
function sortingTilesOnTemperature (tiles, temperatureDescend, continentOption, continentDescend) {
  tiles = tiles.sort((a, b) => {
    const tempOne = parseInt(globalVariables.coreData[a].temperature.slice(0, -2))
    const tempTwo = parseInt(globalVariables.coreData[b].temperature.slice(0, -2))

    if (tempOne < tempTwo) {
      return -1
    }
    if (tempOne > tempTwo) {
      return 1
    }
    return 0
  })
  if (temperatureDescend) {
    tiles.reverse()
  }
  if (continentOption && continentDescend) {
    tiles.reverse()
  }

  return tiles
}

/**
 * @param {Array} tiles array containing til
 * @param {boolean} continentDescend if continent is in descending order
 * @returns {Array} array containing temperature sorted cities
 */
function sortingTilesOnContinent (tiles, continentDescend) {
  tiles.sort((a, b) => {
    const elementOne = globalVariables.coreData[a].timeZone.split('/')[0].toLowerCase()
    const elementTwo = globalVariables.coreData[b].timeZone.split('/')[0].toLowerCase()
    if (elementOne < elementTwo) {
      return -1
    }
    if (elementOne > elementTwo) {
      return 1
    }
    return 0
  })
  if (continentDescend) {
    tiles.reverse()
  }
  return tiles
}
