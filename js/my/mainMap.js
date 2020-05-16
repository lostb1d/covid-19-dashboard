var mymap = L.map('mapid').setView([28.514,83.573], 7);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibG9zdGIxIiwiYSI6ImNrOWg3emMzbTByeDEzam85Nnpma3pyYm8ifQ.zftFe_u1GzqFSvp7_tGMkg'
}).addTo(mymap);

// L.geoJSON(district).addTo(mymap);


var data = [];
district.features.forEach(props => {
    
    if(props.properties.positive == null){
        d = 0;
    }else{
        d= props.properties.positive;
    }
    data.push(d);
    
});

var max = Math.max(...data);
var min = Math.min(...data);




function getColor(d) {
    p = d;
    return p > max/5*4  ? '#fc0303' :
           p > max/5*3  ? '#fc6b03' :
           p > max/5*2  ? '#fcba03' :
           p > max/5*1  ? '#fcdb03' :
           p >  0  ? '#f4fc03' :
                    '#39fc03';
}


function style(feature) {
    
    return {
        fillColor: getColor(feature.properties.positive ),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

L.geoJson(district, {style: style}).addTo(mymap);

function highlightFeature(e) {
    var layer = e.target;
    info.update(layer.feature.properties);
    layer.setStyle({
        weight: 2,
        color: 'red',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(district, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(mymap);


var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Nepal COVID 19 Information</h4>' +  (props ?
        '<b>District : &nbsp;' + props.DIST_EN + '</b><br><b>Positive : &nbsp;</b>' + props.positive + '<br /><b>Active : &nbsp;</b>' + props.active + '<br /><b>Recovered : &nbsp;</b> ' +props.recovered + '<br /><b>Active : &nbsp;</b> ' + props.death
        : 'Hover over a districts');
};

info.addTo(mymap);



var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, max/5*1, max/5*2, max/5*3, max/5*4],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    div.innerHTML = '<i style="background: #39fc03"></i>Zero Cases<br>'
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(mymap);