/**
 * @param {*} date date in a slash separated format m/d/y
 * @returns {string} formatted date
 */
export function changeDateFormat (date) {
  const [month, day, year] = date.split('/')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return day.padStart(2, '0') + '-' + months[month - 1] + '-' + year
}

/**
 * @param {string} time time in a : separated format hr:min:sec
 * @returns {Array} array of strings containing hr,min,sec
 */
export function changeTimeFormat (time) {
  const [hr, min, sec] = time.split(':')
  return [hr.padStart(2, '0'), min.padStart(2, '0'), sec.padStart(2, '0')]
}

/**
 * @param {string} preference preference of the middle section
 * @returns {number} the division number that is selected
 */
export function choosePreferenceDivisionNumber (preference) {
  let divisionNumber
  if (preference === 'sunny') divisionNumber = 0

  if (preference === 'snowflake') divisionNumber = 1

  if (preference === 'rainy') divisionNumber = 2

  return divisionNumber
}

/**
 * @param {string} preference represents preference
 * @param {number} temperature temperature
 * @param {number} humidity humidity
 * @param {number} precipitation precipitation
 * @returns {boolean} whether a city belongs to a selected preference or not
 */
export function filterOnPreference (preference, temperature, humidity, precipitation) {
  if (preference === 'sunny') return (temperature >= 29 && humidity < 50 && precipitation >= 50)

  if (preference === 'snowflake') return (temperature >= 20 && temperature <= 28 && humidity > 50 && precipitation < 50)

  if (preference === 'rainy') return (temperature < 20 && humidity >= 50)

  return false
}

/**
 * @param {number} temperature temperature of the card city
 * @returns {string} name of the icon in card
 */
export function chooseTempCategoryOfCard (temperature) {
  if (temperature >= 29) {
    return 'sunny'
  } else if (temperature >= 20) {
    return 'snowflake'
  } else {
    return 'rainy'
  }
}

/**
 * @param {number} temperature temperature of that particular hour
 * @returns {string} respective icon for that hour
 * choose image according to temperature
 */
export function chooseTempImageOfTimeline (temperature) {
  if (temperature > 29) {
    return 'sunnyIcon'
  } else if (temperature > 22) {
    return 'cloudyIcon'
  } else if (temperature >= 18) {
    return 'windyIcon'
  } else {
    return 'rainyIcon'
  }
}

/**
 *
 * @param {number} time gives time in hrs
 * @param {string} currentMeridian Am or PM
 * @returns {Array}  [changed time , changed AM or PM]
 * changes time to 12hrs time format
 */
export function adjustTimelineTime (time, currentMeridian) {
  if (time > 12) {
    time = time - 12
  }

  if (time === 12) {
    if (currentMeridian === 'AM') {
      currentMeridian = 'PM'
    } else {
      currentMeridian = 'AM'
    }
  }
  return [time, currentMeridian]
}

/**
 * @param {number} tempInCelsius temperature given in celsius
 * @returns {number} temperature in fahrenheit
 */
export function celsiusToFahrenheit (tempInCelsius) {
  return Math.round((tempInCelsius * 1.8) + 32)
}

/**
 * @param {number} spinnerInput number that is given as input in spinner
 * @returns {number} input that is applicable in the cards section
 */
export function setSpinnerInput (spinnerInput) {
  if (spinnerInput < 3) {
    spinnerInput = 3
  }
  if (spinnerInput > 10) {
    spinnerInput = 10
  }

  return spinnerInput
}
