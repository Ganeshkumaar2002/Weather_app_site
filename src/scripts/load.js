import { globalVariables, preferenceIcons } from './index.js'

import { fillContentTop } from './generateTop.js'

import { fillContentBottom } from './generateBottom.js'

/**
 *fill the entire top section with standard city newYork
 */
export function fillContentOnLoad () {
  populateDropdown()

  createCityDates()

  fillContentTop('newyork')

  preferenceIcons[0].click()

  globalVariables.displayedTiles = Object.keys(globalVariables.coreData)
  fillContentBottom(globalVariables.displayedTiles)
}

/**
 *fill the datalist with options of cities
 */
function populateDropdown () {
  const dropDown = document.getElementById('cities')
  for (let i = 0; i < globalVariables.cityNames.length; i++) {
    dropDown.innerHTML += `<option value=${globalVariables.coreData[globalVariables.cityNames[i]].cityName}></option>`
  }
}

/**
 * creating the city dates map
 */
function createCityDates () {
  for (const city of globalVariables.cityNames) {
    globalVariables.cityDates.set(city, new Date(new Date().toLocaleString('en', { timeZone: globalVariables.coreData[city].timeZone })))
  }
}
