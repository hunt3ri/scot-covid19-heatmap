import {Map, View} from 'ol';
import {fromLonLat} from 'ol/proj'
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import moment from 'moment';

type CovidStat = {
    week: number
    total: number
}

type CovidStats = {
    totalDeaths: Array<CovidStat>
};


const week = document.getElementById('week');
const weekLbl = document.getElementById('weekLbl');

const map = new Map({
    target: 'map',
    layers: [
        new TileLayer({
            source: new OSM()
        })
    ],
    view: new View({
        center: fromLonLat([-3.828743, 56.758342]),
        zoom: 7,
        maxZoom: 9,
        minZoom: 5
    })
});

const getJSON = function (url: string, callback: any) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        let status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

function getTotalDeaths(weekNo: number) {
    getJSON("https://raw.githubusercontent.com/hunt3ri/scot-covid-geo-coder/master/data/totalDeaths.json",
        function (err: string, data: CovidStats) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {
                //console.log("Week is: " + weekNo);
                for (let element of data["totalDeaths"]) {
                    if (element["week"] == weekNo) {
                        //console.log("Total is " + element["total"])
                        weekLbl!.innerHTML = "Week " + weekNo + ' - ' + getDate(weekNo) + ' - Total Deaths: ' + element["total"];

                    }

                }
            }
        });
}

// var weekHandler = function () {
//     map.removeLayer(glbHeatmapLayer)
//     map.removeLayer(glbPointsLayer)
//     setHeatMapLayer(week.value)
//     setPointsLayer(week.value)
//     getTotalDeaths(week.value)
// };



//week.addEventListener('change', weekHandler);




console.log("Hello TS ABI")
let abi = test;




export function getDate(weeksToAdd: number): string {
    let startDate = moment('2020-03-09');
    startDate.add(weeksToAdd, 'week');
    return startDate.format("DD-MMM-YYYY")
}