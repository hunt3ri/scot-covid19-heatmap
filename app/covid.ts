import {setMap, setHeatMapLayer, setPointsLayer, resetLayers} from './map'
import {getCovidStats} from './utils'
import {CovidStats} from "./models";
import axios from 'axios';
import Vue from 'vue'


export function setTotalDeaths(weekNo: number): void {
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


let app = new Vue({
    el: '#app',
    data: {
        message: "",
        selectedWeek: "1"  // Set to 1 to ensure we reinitialise on reload
    },
    mounted() {
        map: {
            setMap();
            setTotalDeaths(1);
            setHeatMapLayer(1)
            setPointsLayer(1)
        }
    },
    methods: {
        weekHandler(weekNoStr: string) {
            let weekNo = Number(weekNoStr)
            resetLayers()
            setHeatMapLayer(weekNo)
            setPointsLayer(weekNo)
            setTotalDeaths(weekNo)
        }
    }
});
