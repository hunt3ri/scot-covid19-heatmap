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
    totalDeaths: CovidStat[]
};

interface requestCallback { (success: boolean, covidStats: CovidStats): void }


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

const getJSON = function (url: string, callback: requestCallback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        let status = xhr.status;
        if (status === 200) {
            callback(true, xhr.response);
        } else {
            callback(false, xhr.response);
        }
    };
    xhr.send();
};

function getTotalDeaths(weekNo: number) {
    getJSON("https://raw.githubusercontent.com/hunt3ri/scot-covid-geo-coder/master/data/totalDeaths.json",
        function (success: boolean, covidStats: CovidStats): void {
            if (success) {
                covidStats.totalDeaths.forEach(stat => {
                    if (stat.week === weekNo) {
                        weekLbl!.innerHTML = "Week " + weekNo + ' - ' + getDate(weekNo) + ' - Total Deaths: ' + stat.total;
                    }
                })
            } else {
                alert('Error retrieving JSON file');
            }
        });
}

const week: HTMLInputElement = document.getElementById('week') as HTMLInputElement;
const weekLbl: HTMLLabelElement = document.getElementById('weekLbl') as HTMLLabelElement;


var weekHandler = function () {
    // map.removeLayer(glbHeatmapLayer)
    // map.removeLayer(glbPointsLayer)
    // setHeatMapLayer(week.value)
    // setPointsLayer(week.value)
    getTotalDeaths(Number(week.value))
};

week!.addEventListener('change', weekHandler);


export function getDate(weeksToAdd: number): string {
    let startDate = moment('2020-03-09');
    startDate.add(weeksToAdd, 'week');
    return startDate.format("DD-MMM-YYYY")
}

getTotalDeaths(1)