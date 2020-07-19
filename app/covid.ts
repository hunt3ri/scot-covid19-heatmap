import {setMap, setHeatMapLayer, setPointsLayer, resetLayers} from './map'
import {getCovidStats, getDate} from './utils'
import {CovidDeathsFeatureCollection, CovidStats} from "./models";
import axios from 'axios';
import Vue from 'vue'


function setTotalDeaths(weekNo: number): void {
    axios.get("https://raw.githubusercontent.com/hunt3ri/scot-covid-geo-coder/master/data/totalDeaths.json")
        .then(function (response) {
            //console.log(weekNo)
            let covidStats: CovidStats = response.data;
            app.message = getCovidStats(covidStats, weekNo)
        })
        .catch(function (error) {
            alert('Error retrieving JSON file ' + error);
        });
}

function setLocation(weekNo: number): void {
    axios.get('https://raw.githubusercontent.com/hunt3ri/scot-covid-geo-coder/master/data/week' + weekNo + '.json')
        .then(function (response) {
            let statsGeoJson: CovidDeathsFeatureCollection = response.data;
            app.locations = [];  // Reset array on each call

            statsGeoJson.features.forEach( feature => {
                app.locations.push(feature.properties)
            })
        })
        .catch(function (error) {
            alert('Error retrieving JSON file ' + error);
        });
}


let app = new Vue({
    el: '#app',
    data: {
        message: "",
        selectedWeek: "1",  // Set to 1 to ensure we reinitialise on reload
        locations: [{}]
    },
    mounted() {
            setLocation(1);
            setMap();
            setTotalDeaths(1);
            setHeatMapLayer(1);
            setPointsLayer(1);
    },
    methods: {
        weekHandler(weekNoStr: string) {
            let weekNo = Number(weekNoStr)
            resetLayers()
            setLocation(weekNo);
            setHeatMapLayer(weekNo)
            setPointsLayer(weekNo)
            setTotalDeaths(weekNo)
        }
    }
});
