import { globalVariables } from './index.js'

import { fillContentOnLoad } from './load.js'

import { runCityDates } from './timeUpdates.js'

/**
 * fetch data using fetch() note:async and await are important as everything needs to run after completing this
 */
export async function fetchData () {
  globalVariables.coreData = await fetch('/all-timezone-cities').then((res) => { return res.json() })

  for (const i in globalVariables.coreData) {
    const cityKey = globalVariables.coreData[i].cityName.toLowerCase()
    globalVariables.coreData[cityKey] = globalVariables.coreData[i]
    delete globalVariables.coreData[i]
  }
}

/**
 * to get the name of every city in an array
 */
export function createCityNames () {
  globalVariables.cityNames = Object.keys(globalVariables.coreData)
  globalVariables.cityNames.sort()
}

/**
 *this function is invoked when site is loaded
 *does fetching data , creating an array of cities , and fill top section with a standard city
 */
export function loadFunction () {
  fillContentOnLoad()

  runCityDates()
}
