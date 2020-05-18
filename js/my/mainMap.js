var mymap = L.map('mapid').setView([28.514,83.573], 7);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibG9zdGIxIiwiYSI6ImNrOWg3emMzbTByeDEzam85Nnpma3pyYm8ifQ.zftFe_u1GzqFSvp7_tGMkg'
}).addTo(mymap);


// ----------- bhuwan adhikari ---------- 
$.ajax({
    url : "https://covid19nepal-api.herokuapp.com/corona-data",
    method: "GET",
    success : function(data){
        var district_json = [];
        var cases =[];
        for(var i=0;i<data.length;i++){
           
            var data1 = data[i].split(',');
            cases.push(data1[3]);
            var data1 = {
                'district' : data1[2],
                'positive' : data1[3],
                'active' : data1[3] - data1[4] - data1[5],
                'death' : data1[4],
                'recovered' : data1[5],               
            }
            district_json.push(data1);
        }
        console.log(district_json[6].district);
        console.log(district_json[6].positive);
        console.log(district_json[6].death);

   
// ----------- bhuwan adhikari --------------- 


// var data = [];
// district.features.forEach(props => {
    
//     if(props.properties.positive == null){
//         d = 0;
//     }else{
//         d= props.properties.positive;
//     }
//     data.push(d);
    
// });

var max = Math.max(...cases);
var min = Math.min(...cases);

console.log('Max : ' + max);




function getColor(d) {
    for(var i = 0; i< district_json.length ; i++){
        if(d == district_json[i].district){
            var  p = district_json[i].positive;
        }
    }
    return p > max/5*4  ? '#ff0000' :
           p > max/5*3  ? '#fa07ea' :
           p > max/5*2  ? '#ffaa00' :
           p > max/5*1  ? '#ffc800' :
           p >  0  ?       '#ffee00' :
                            '#39fc03';
}


function style(feature) {
    
    return {
        fillColor: getColor(feature.properties.DIST_EN ),
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
    info.update(layer.feature.properties.DIST_EN);
    layer.setStyle({
        weight: 2,
        color: '#fc03ec',
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
    for(var i = 0; i< district_json.length ; i++){
        if(props == district_json[i].district){
            var  dist = district_json[i].district;
            var pos = district_json[i].positive;
            var act = district_json[i].active;
            var recov = district_json[i].recovered;
            var death = district_json[i].death;
        }
    }
    this._div.innerHTML = '<h4>Nepal COVID 19 Information</h4>' +  (props ?
        '<b>District : &nbsp;' + dist + '</b><br><b>Positive : &nbsp;</b>' + pos + '<br /><b>Active : &nbsp;</b>' + act + '<br /><b>Recovered : &nbsp;</b> ' + recov + '<br /><b>Death(s) : &nbsp;</b> ' + death
        : 'Hover over a districts');
};

info.addTo(mymap);



var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
 
    // return p > max/5*4  ? '#ff0000' :
    // p > max/5*3  ? '#fa07ea' :
    // p > max/5*2  ? '#ffaa00' :
    // p > max/5*1  ? '#ffc800' :
    // p >  0  ?       '#ffee00' :
    //                  '#39fc03';

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, parseInt(max/5*1), parseInt(max/5*2), parseInt(max/5*3), parseInt(max/5*4)],
        colors = ['#ffee00' , '#ffc800' , '#ffaa00', '#fa07ea' ,'#ff0000' ],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    div.innerHTML = '<i style="background: #39fc03"></i>Zero Cases<br>'
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(mymap);


// ------------ radio selection --------------- 


var radio = L.control({position: 'bottomleft'});

radio.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
    

    // loop through our density intervals and generate a label with a colored square for each interval
    div.innerHTML = 'Select the Indicator<br><br><input type="radio" name="indicator" id="positive" onclick="getstyle(`feature,positive`)" checked><b>Positive</b>';
    div.innerHTML += '<br><input type="radio" name="indicator"  id="active" onclick="getstyle(`feature,active`)"><b>Active Cases</b>';
    div.innerHTML += '<br><input type="radio"  name="indicator"  id="recovered" onclick="getstyle(`feature , recovered`)"><b>Recovered</b>';
    div.innerHTML += '<br><input type="radio" name="indicator"  id="death" onclick="getstyle(`feature , death`)"><b>Deaths</b>';

    return div;
};

radio.addTo(mymap);

},
error : function(err){
  console.log(err);
}
})
    

