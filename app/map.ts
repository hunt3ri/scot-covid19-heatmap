import {GeoJSON} from 'ol/format';
import Heatmap from 'ol/layer/Heatmap'
import Map from 'ol/map';
import View from 'ol/View';
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import {fromLonLat} from "ol/proj";
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';


let map: Map;
let glbHeatmapLayer: Heatmap;
let glbPointsLayer: VectorLayer;

export function setMap() {
    map = new Map({
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

export function setHeatMapLayer(weekNo: number): void {
    glbHeatmapLayer = new Heatmap({
        source: new VectorSource({
            url: 'https://raw.githubusercontent.com/hunt3ri/scot-covid-geo-coder/master/data/week' + weekNo + '.json',
            format: new GeoJSON()
        }),
        blur: 10,
        radius: 25,
        weight: function (feature) {
            //console.log(feature.get('weight'))
            return feature.get('weight');
        }

    });
    map.addLayer(glbHeatmapLayer);
}


function pointStyleFunction(feature: any, resolution: any): Style {
    return new Style({
        text: new Text({
            font: 'bold  16px Arial, Verdana, Helvetica, sans-serif',
            textAlign: "center",
            text: feature.get('deaths').toString()
        })
    });
}


export function setPointsLayer(weekNo: number): void {
    glbPointsLayer = new VectorLayer({
        source: new VectorSource({
            url: 'https://raw.githubusercontent.com/hunt3ri/scot-covid-geo-coder/master/data/week' + weekNo + '.json',
            format: new GeoJSON()
        }),
        style: pointStyleFunction
    });

    map.addLayer(glbPointsLayer);
}


export function resetLayers(): void {
    map.removeLayer(glbHeatmapLayer);
    map.removeLayer(glbPointsLayer);
}