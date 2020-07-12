import {Map, View} from 'ol';
import {fromLonLat} from 'ol/proj'
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import moment from 'moment';
import axios from 'axios';
import Vue from 'vue'

type CovidStat = {
    week: number
    total: number
}

type CovidStats = {
    totalDeaths: CovidStat[]
};

function setMap() {
    return new Map({
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
}

function setTotalDeaths(weekNo: number): void {
    axios.get("https://raw.githubusercontent.com/hunt3ri/scot-covid-geo-coder/master/data/totalDeaths.json")
        .then(function (response) {
            console.log(weekNo)
            let covidStats: CovidStats = response.data;

            covidStats.totalDeaths.forEach(stat => {
                if (stat.week === weekNo) {
                    //weekLbl.innerHTML = "Week " + weekNo + ' - ' + getDate(weekNo) + ' - Total Deaths: ' + stat.total;
                    app.message = "Week " + weekNo + ' - ' + getDate(weekNo) + ' - Total Deaths: ' + stat.total;
                }
            })
        })
        .catch(function (error) {
            alert('Error retrieving JSON file');
        });
}


export function getDate(weeksToAdd: number): string {
    let startDate = moment('2020-03-09');
    startDate.add(weeksToAdd, 'week');
    return startDate.format("DD-MMM-YYYY")
}


const app = new Vue({
    el: '#app',
    data: {
        message: "",
        selectedWeek: "1"  // Set to 1 to ensure we reinitialise on reload
    },
    mounted() {
        map: {
            setMap();
            setTotalDeaths(1);
        }
    },
    methods: {
        weekHandler(weekNoStr: string) {
            let weekNo = Number(weekNoStr)
            // map.removeLayer(glbHeatmapLayer)
            // map.removeLayer(glbPointsLayer)
            // setHeatMapLayer(week.value)
            // setPointsLayer(week.value)
            //getTotalDeaths(Number(week.value))
            setTotalDeaths(weekNo)
        }
    }
});