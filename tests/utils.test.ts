import { getDate, getCovidStats} from "../app/utils"
import {CovidStats, CovidStat} from "../app/models"

test('adds 1 week to start date', () => {
  expect(getDate(1)).toBe("16-Mar-2020");
});

test('Message set if match found', () => {
  let covidStat: CovidStat = new CovidStat()
  covidStat.total = 10
  covidStat.week = 12

  let covidStats: CovidStats = new CovidStats()
  covidStats.totalDeaths.push(covidStat)

  expect(getCovidStats(covidStats, 12)).toBe("Week 12 - 01-Jun-2020 - Total Deaths: 10");
});

test('No match found returned if weekNo has no match', () => {
  let covidStat: CovidStat = new CovidStat()
  covidStat.total = 10
  covidStat.week = 12

  let covidStats: CovidStats = new CovidStats()
  covidStats.totalDeaths.push(covidStat)

  expect(getCovidStats(covidStats, 13)).toBe("No match found");
});

