/* eslint-env jest */

import {
  changeDateFormat,
  changeTimeFormat,
  choosePreferenceDivisionNumber,
  filterOnPreference,
  chooseTempCategoryOfCard,
  chooseTempImageOfTimeline,
  adjustTimelineTime,
  celsiusToFahrenheit,
  setSpinnerInput
} from '../../src/scripts/unitFunctions'

test('Changing Date format', () => {
  expect(changeDateFormat('1/1/2023')).toBe('01-Jan-2023')
  expect(changeDateFormat('2/9/2023')).toBe('09-Feb-2023')
  expect(changeDateFormat('3/10/2024')).toBe('10-Mar-2024')
  expect(changeDateFormat('4/15/2020')).toBe('15-Apr-2020')
  expect(changeDateFormat('5/20/2021')).toBe('20-May-2021')
  expect(changeDateFormat('6/21/2027')).toBe('21-Jun-2027')
  expect(changeDateFormat('7/8/2026')).toBe('08-Jul-2026')
  expect(changeDateFormat('8/23/2020')).toBe('23-Aug-2020')
  expect(changeDateFormat('9/25/2022')).toBe('25-Sep-2022')
  expect(changeDateFormat('10/26/2023')).toBe('26-Oct-2023')
  expect(changeDateFormat('11/27/2019')).toBe('27-Nov-2019')
  expect(changeDateFormat('12/29/2030')).toBe('29-Dec-2030')
})

test('changing time format', () => {
  expect(changeTimeFormat('1:1:1')).toStrictEqual(['01', '01', '01'])
  expect(changeTimeFormat('10:5:7')).toStrictEqual(['10', '05', '07'])
  expect(changeTimeFormat('5:10:7')).toStrictEqual(['05', '10', '07'])
  expect(changeTimeFormat('2:8:57')).toStrictEqual(['02', '08', '57'])
  expect(changeTimeFormat('12:30:9')).toStrictEqual(['12', '30', '09'])
  expect(changeTimeFormat('10:45:32')).toStrictEqual(['10', '45', '32'])
})

test('choosing appropriate preference icons division number for given preference', () => {
  expect(choosePreferenceDivisionNumber('sunny')).toBe(0)
  expect(choosePreferenceDivisionNumber('snowflake')).toBe(1)
  expect(choosePreferenceDivisionNumber('rainy')).toBe(2)
})

test('determine the preference category the city falls in', () => {
  expect(filterOnPreference('sunny', 29, 49, 50)).toBe(true)
  expect(filterOnPreference('sunny', 28, 49, 50)).toBe(false)
  expect(filterOnPreference('sunny', 29, 50, 50)).toBe(false)
  expect(filterOnPreference('sunny', 29, 49, 49)).toBe(false)

  expect(filterOnPreference('snowflake', 21, 51, 49)).toBe(true)
  expect(filterOnPreference('snowflake', 18, 51, 49)).toBe(false)
  expect(filterOnPreference('snowflake', 29, 51, 49)).toBe(false)
  expect(filterOnPreference('snowflake', 27, 49, 49)).toBe(false)
  expect(filterOnPreference('snowflake', 28, 51, 52)).toBe(false)

  expect(filterOnPreference('rainy', 19, 55, 0)).toBe(true)
  expect(filterOnPreference('rainy', 20, 55, 50)).toBe(false)
  expect(filterOnPreference('rainy', -17, 40, 100)).toBe(false)
})

test('Choosing temp Icon for a  given temperature', () => {
  expect(chooseTempCategoryOfCard(-19)).toBe('rainy')
  expect(chooseTempCategoryOfCard(0)).toBe('rainy')
  expect(chooseTempCategoryOfCard(19)).toBe('rainy')

  expect(chooseTempCategoryOfCard(20)).toBe('snowflake')
  expect(chooseTempCategoryOfCard(25)).toBe('snowflake')
  expect(chooseTempCategoryOfCard(28)).toBe('snowflake')

  expect(chooseTempCategoryOfCard(29)).toBe('sunny')
  expect(chooseTempCategoryOfCard(50)).toBe('sunny')
  expect(chooseTempCategoryOfCard(100)).toBe('sunny')
})

test('Choosing temp Icon for each hour in timeline', () => {
  expect(chooseTempImageOfTimeline(-10)).toBe('rainyIcon')
  expect(chooseTempImageOfTimeline(0)).toBe('rainyIcon')
  expect(chooseTempImageOfTimeline(5)).toBe('rainyIcon')
  expect(chooseTempImageOfTimeline(17)).toBe('rainyIcon')

  expect(chooseTempImageOfTimeline(18)).toBe('windyIcon')
  expect(chooseTempImageOfTimeline(20)).toBe('windyIcon')
  expect(chooseTempImageOfTimeline(22)).toBe('windyIcon')

  expect(chooseTempImageOfTimeline(23)).toBe('cloudyIcon')
  expect(chooseTempImageOfTimeline(25)).toBe('cloudyIcon')
  expect(chooseTempImageOfTimeline(29)).toBe('cloudyIcon')

  expect(chooseTempImageOfTimeline(30)).toBe('sunnyIcon')
  expect(chooseTempImageOfTimeline(50)).toBe('sunnyIcon')
  expect(chooseTempImageOfTimeline(60)).toBe('sunnyIcon')
})

test('changing hour time in timeline', () => {
  expect(adjustTimelineTime(9, 'AM')).toStrictEqual([9, 'AM'])
  expect(adjustTimelineTime(12, 'AM')).toStrictEqual([12, 'PM'])
  expect(adjustTimelineTime(12, 'PM')).toStrictEqual([12, 'AM'])
  expect(adjustTimelineTime(1, 'AM')).toStrictEqual([1, 'AM'])
  expect(adjustTimelineTime(13, 'AM')).toStrictEqual([1, 'AM'])
})

test('Celsius to fahrenheit', () => {
  expect(celsiusToFahrenheit(-50)).toBe(Math.round(-58))
  expect(celsiusToFahrenheit(-33)).toBe(Math.round(-27))
  expect(celsiusToFahrenheit(0)).toBe(Math.round(32))
  expect(celsiusToFahrenheit(46)).toBe(Math.round(115))
  expect(celsiusToFahrenheit(100)).toBe(Math.round(212))
})

test('Manage the spinner Input', () => {
  expect(setSpinnerInput(-5)).toBe(3)
  expect(setSpinnerInput(0)).toBe(3)
  expect(setSpinnerInput(2)).toBe(3)

  expect(setSpinnerInput(3)).toBe(3)
  expect(setSpinnerInput(4)).toBe(4)
  expect(setSpinnerInput(7)).toBe(7)
  expect(setSpinnerInput(9)).toBe(9)
  expect(setSpinnerInput(10)).toBe(10)

  expect(setSpinnerInput(11)).toBe(10)
  expect(setSpinnerInput(20)).toBe(10)
  expect(setSpinnerInput(50)).toBe(10)
})
