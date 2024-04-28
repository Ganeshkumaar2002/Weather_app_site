import { globalVariables, arrows } from './index.js'

import { fillTopOnInvalid, fillContentTop, getAndCalculateFactors } from './generateTop.js'

import { changePreferenceIndicator, sortCityCards, generateMiddleCards } from './generateMiddle.js'

import { fillSortedTiles } from './generateBottom.js'

import { filterOnPreference, setSpinnerInput } from './unitFunctions.js'

/**
 * @param {object} input object of the input tag
 * actions that should happen when top section input is changed
 */
export function actionOnTopInputChange (input) {
  const city = input.target.value.toLowerCase()
  clearInterval(globalVariables.timerId)
  if (!globalVariables.cityNames.includes(city)) {
    fillTopOnInvalid()
  } else {
    fillContentTop(city)
  }
}

/**
 * @param {object} icon object of the selected icon
 * actions to be done when a particular preference is selected
 */
export function actionOnPreferenceClick (icon) {
  const preference = icon.target.id.slice(11)

  changePreferenceIndicator(preference)

  const filteredCities = globalVariables.cityNames.filter((city) => {
    const [temperature, humidity, precipitation] = getAndCalculateFactors(city).slice(0, 3)

    return filterOnPreference(preference, temperature, humidity, precipitation)
  })

  globalVariables.displayedCards = sortCityCards(filteredCities, preference)

  generateMiddleCards(globalVariables.displayedCards.slice(0, document.querySelector('.preference-icons input').value))
}

/**
 * @param {object} input object of the spinner input tag
 * actions that should happen when spinner input change
 */
export function actionOnSpinnerChange (input) {
  let spinnerInput = input.target.value

  spinnerInput = setSpinnerInput(spinnerInput)

  input.target.value = spinnerInput

  generateMiddleCards(globalVariables.displayedCards.slice(0, spinnerInput))
}

/**
 * fits the cards based on overflow or underflow
 */
export function fitCards () {
  const cardsContainer = document.getElementsByClassName('cards-container')[0]
  if (cardsContainer.scrollWidth > cardsContainer.clientWidth) {
    cardsContainer.style.justifyContent = 'start'
    for (let i = 0; i < 2; i++) {
      arrows[i].style.display = 'inline'
    }
    actionOnCardsScroll.call(document.getElementsByClassName('cards-container')[0])
  } else {
    cardsContainer.style.justifyContent = 'center'
    for (let i = 0; i < 2; i++) {
      arrows[i].style.display = 'none'
    }
  }
}

/**
 * scrolls to left of the container
 */
export function cardsScrollLeft () {
  document.getElementsByClassName('cards-container')[0].scrollBy({
    top: 0,
    left: -300,
    behavior: 'smooth'
  })
}

/**
 * scrolls to right of the container
 */
export function cardsScrollRight () {
  document.getElementsByClassName('cards-container')[0].scrollBy({
    top: 0,
    left: +300,
    behavior: 'smooth'
  })
}

/**
 * actions that should happen when cards is scrolled(removing arrow on one side)
 */
export function actionOnCardsScroll () {
  if (Math.ceil(this.scrollWidth - this.scrollLeft) === this.offsetWidth || Math.floor(this.scrollWidth - this.scrollLeft) === this.offsetWidth) {
    arrows[1].style.visibility = 'hidden'
  } else {
    arrows[1].style.visibility = 'visible'
  }
  if (this.scrollLeft === 0) {
    arrows[0].style.visibility = 'hidden'
  } else {
    arrows[0].style.visibility = 'visible'
  }
}

/**
 * adds or removes indicator and generate tiles
 */
export function actionOnSortOptionSelect () {
  if (this.classList.contains('indicator')) {
    this.classList.remove('indicator')
  } else {
    this.classList.add('indicator')
  }

  fillSortedTiles()
}

/**
 * changes ascend to descend class and vise versa and generate tiles
 * @param {object} sortOptionArrow arrow that is clicked
 */
export function actionOnSortArrowClick (sortOptionArrow) {
  if (sortOptionArrow.classList.contains('ascend')) {
    sortOptionArrow.classList.remove('ascend')
    sortOptionArrow.classList.add('descend')
  } else {
    sortOptionArrow.classList.add('ascend')
    sortOptionArrow.classList.remove('descend')
  }

  fillSortedTiles()
}
