'use strict'

const { filter, map, groupBy, pipe } = require('ramda')

const receivedData = reading => reading.data.length > 0 && !reading.inactive

const toFarenheit = temperature => temperature * 1.8 + 32

const convertToFarenheit = reading => {
  return { ...reading, temperature: toFarenheit(reading.temperature) }
}

const inAllowedTypes = reading => ['environmental', 'asset', 'vehicle'].includes(reading.type)

const onlyReceivedData = filter(receivedData)

const allInFarenheit = map(convertToFarenheit)

const onlyAllowedTypes = filter(inAllowedTypes)

const groupByType = groupBy(reading => reading.type)

const processReadings = pipe(onlyReceivedData, allInFarenheit, onlyAllowedTypes, groupByType)

module.exports = { processReadings }
