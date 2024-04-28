import { fetchData, createCityNames, loadFunction } from './dataPreLoad.js'
import { fillContentBottom } from './generateBottom.js'
import { fillContentTop } from './generateTop.js'

import {
  actionOnTopInputChange,
  actionOnPreferenceClick,
  actionOnSpinnerChange,
  fitCards,
  cardsScrollLeft,
  cardsScrollRight,
  actionOnCardsScroll,
  actionOnSortOptionSelect,
  actionOnSortArrowClick
} from './listenerFunctions.js'

export const globalVariables = {
  timerId: null, // id for the clock set interval in top section
  coreData: null, // The json data fetched from data.json
  cityNames: null, // array of all city names used for uniquely identifying each city data
  displayedCards: null, // array of cities to be displayed as cards
  displayedTiles: null, // array of cities to be displayed as tiles
  cityDates: new Map() // map containing city and its corresponding date object
}

/* arrows on either side of cards */
export const arrows = document.getElementsByClassName('cards-arrow')

export const cardsContainer = document.querySelector('.cards-container')

export const sortOptions = document.querySelectorAll('.bottom-head-sort>div')

export const preferenceIcons = document.querySelectorAll('.preference-icons img')

const timelineBox = document.querySelectorAll('.timeline-box:not(.grey)')

export const timelineBoxItems = []

for (let i = 0; i < timelineBox.length; i++) {
  timelineBoxItems.push([timelineBox[i].getElementsByClassName('timeline-time')[0], timelineBox[i].getElementsByClassName('timeline-icon')[0], timelineBox[i].getElementsByClassName('timeline-temp')[0]])
}

/**
 * reloads the whole page
 */
async function pageRefresh () {
  await fetchData()

  clearInterval(globalVariables.timerId)
  fillContentTop(document.getElementById('forecast-select').value.toLowerCase())

  for (let i = 0; i < 3; i++) {
    if (preferenceIcons[i].classList.contains('indicator')) {
      preferenceIcons[i].click()
    }
  }

  fillContentBottom(globalVariables.displayedTiles)
}

(async () => {
  await fetchData()
  createCityNames()
  loadFunction()
})()

/* mapping a function for input change */
document.getElementById('forecast-select').addEventListener('change', actionOnTopInputChange)

/* setting event listener for each preference icon on click */
preferenceIcons.forEach((icon) => {
  icon.addEventListener('click', (icon) => actionOnPreferenceClick(icon))
})

/* setting event listener for spinner input change */
document.querySelector('.preference-icons input').addEventListener('change', actionOnSpinnerChange)

/* event listener to check it cards overflow on size change */
window.addEventListener('resize', fitCards)

arrows[0].addEventListener('click', cardsScrollLeft)

arrows[1].addEventListener('click', cardsScrollRight)

cardsContainer.addEventListener('scroll', actionOnCardsScroll)

sortOptions.forEach((option) => {
  option.addEventListener('click', actionOnSortOptionSelect)
  option.querySelector('img').addEventListener('click', (event) => {
    if (event.currentTarget.parentNode.classList.contains('indicator')) {
      event.stopPropagation()
      actionOnSortArrowClick(event.currentTarget)
    }
  })
})

setInterval(pageRefresh, 120000)
