var glbHeatmapLayer
var glbPointsLayer
var totalDeaths

var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM({layer: 'toner'})
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([-3.828743, 56.758342]),
        zoom: 7,
        maxZoom: 9,
        minZoom: 5

    })
});


function pointStyleFunction(feature, resolution) {
    return new ol.style.Style({
        text: new ol.style.Text({
            font: 'bold  16px Arial, Verdana, Helvetica, sans-serif',
            textAlign: "center",
            text: feature.get('deaths').toString()
        })
    });
}


function setHeatMapLayer(week) {
    console.log("Setting Layer")
    var heatMapLayer = new ol.layer.Heatmap({
        source: new ol.source.Vector({
            url: 'https://raw.githubusercontent.com/hunt3ri/scot-covid-geo-coder/master/data/week' + week + '.json',
            format: new ol.format.GeoJSON({})
        }),
        blur: 10,
        radius: 25,
        weight: function (feature) {
            //console.log(feature.get('weight'))
            return feature.get('weight');
        }

    });
    map.addLayer(heatMapLayer)
    glbHeatmapLayer = heatMapLayer

}

function setPointsLayer(week) {
    var pointsLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: 'https://raw.githubusercontent.com/hunt3ri/scot-covid-geo-coder/master/data/week' + week + '.json',
            format: new ol.format.GeoJSON()
        }),
        style: pointStyleFunction

    });

    map.addLayer(pointsLayer);
    glbPointsLayer = pointsLayer
}


function getDate(weeksToAdd) {
    var a = moment('2020-03-09');
    a.add(weeksToAdd, 'week');
    return a.format("DD-MMM-YYYY")
}

var week = document.getElementById('week');
var weekLbl = document.getElementById('weekLbl');


function getTotalDeaths(weekNo) {
    getJSON("https://raw.githubusercontent.com/hunt3ri/scot-covid-geo-coder/master/data/totalDeaths.json",
        function (err, data) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {
                //console.log("Week is: " + weekNo);
                for (var element of data["totalDeaths"]) {
                    if (element["week"] == weekNo) {
                        //console.log("Total is " + element["total"])
                        weekLbl.innerHTML = "Week " + weekNo + ' - ' + getDate(weekNo) + ' - Total Deaths: ' + element["total"];

                    }

                }
            }
        });
}


var weekHandler = function () {
    map.removeLayer(glbHeatmapLayer)
    map.removeLayer(glbPointsLayer)
    setHeatMapLayer(week.value)
    setPointsLayer(week.value)
    getTotalDeaths(week.value)
};

getTotalDeaths(1)
setHeatMapLayer(1)
setPointsLayer(1)
week.addEventListener('change', weekHandler);
