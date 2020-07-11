import moment from 'moment';

let test: string = "Bob";
console.log("Hello TS ABI")
let abi = test;


export function getDate(weeksToAdd: number): string {
    let startDate = moment('2020-03-09');
    startDate.add(weeksToAdd, 'week');
    return startDate.format("DD-MMM-YYYY")
}