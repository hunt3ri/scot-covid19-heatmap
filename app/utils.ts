import moment from "moment";
import {CovidStats} from './models'

export function getDate(weeksToAdd: number): string {
    let startDate = moment('2020-03-09');
    startDate.add(weeksToAdd, 'week');
    return startDate.format("DD-MMM-YYYY")
}

export function getCovidStats(covidStats: CovidStats, weekNo: number): string {
    let message: string = "No match found"
    covidStats.totalDeaths.forEach(stat => {
        if (stat.week === weekNo) {
            message = "Week " + weekNo + ' - ' + getDate(weekNo) + ' - Total Deaths: ' + stat.total;
        }
    })
   return message;
}