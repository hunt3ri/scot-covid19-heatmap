import {Map, View} from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import {fromLonLat} from "ol/proj";

export function setMap() {
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
