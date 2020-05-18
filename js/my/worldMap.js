var mymap = L.map('mapid').setView([34.2,57.3], 2);
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
    url : "https://nepalcorona.info/api/v1/data/world",
    method: "GET",
    success : function(world){
        var cases = [];
        for(var i =2 ; i< world.length ; i++){
           cases.push(world[i].totalCases);
        }


        var max = Math.max(...cases);
        var min = Math.min(...cases);
        console.log(max);
        console.log(world);
    


   
// ----------- bhuwan adhikari --------------- 
// world.features.forEach(props => {
    
//     if(props.properties.positive == null){
//         d = 0;
//     }else{
//         d= props.properties.positive;
//     }
//     data.push(d);
    
// });

// var max = Math.max(...data);
// var min = Math.min(...data);


function getColor(d) {
    for(var i = 0; i< world.length ; i++){
        if(d == world[i].country){
            var  p = world[i].totalCases;
        }
    }
    return p > max/10*9  ? '#ff0000' :
            p > max/10*8  ? '#FF171C' :
            p > max/10*7  ? '#FF2D39' :
            p > max/10*6  ? '#FF4455' :
            p > max/10*5  ? '#FF5B71' :
            p > max/10*4  ? '#FF718E' :
           p > max/10*3  ? '#FF88AA' :
           p > max/10*2  ? '#FF9FC6' :
           p > max/10*1  ? '#FFB5E3' :
           p >  0  ?       '#FFCCFF' :
                            '#ebe9e6';
}


function style(feature) {
    
    return {
        fillColor: getColor(feature.properties.name ),
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
    info.update(layer.feature.properties.name);
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
    for(var i = 0; i< world.length ; i++){
        if(props == world[i].country){
            var country = world[i].country;
            var totalCases = world[i].totalCases;
            var activeCases = world[i].activeCases;
            var totalDeaths = world[i].totalDeaths;
            var totalRecovered = world[i].totalRecovered;
            var flag_c = world[i].countryInfo.flag;


        }
        this._div.innerHTML = '<h4>World COVID 19 Information</h4>' +  (props ?
            '<b>Country : &nbsp;' + country + '</b><br><b>Total Cases : &nbsp;</b>' + totalCases + '<br /><b>Active Cases : &nbsp;</b>' + activeCases + '<br /><b>Recovered : &nbsp;</b> ' + totalRecovered + '<br /><b>Death(s) : &nbsp;</b> ' + totalDeaths
            : 'Hover over a Country');
    }
  
};

info.addTo(mymap);



var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, parseInt(max/10*1), parseInt(max/10*2), parseInt(max/10*3), parseInt(max/10*4), parseInt(max/10*5), parseInt(max/10*6),parseInt(max/10*7),parseInt(max/10*8),parseInt(max/10*9)],
        colors = ['#FFCCFF' , '#FFB5E3' , '#FF9FC6', '#FF88AA' ,'#FF718E' , '#FF5B71' , '#FF4455', '#FF2D39','#FF171C', '#ff0000' ],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    div.innerHTML = '<i style="background: #ebe9e6"></i>Data Unavailable<br>'
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(mymap);




// ------------ radio selection --------------- 


// var radio = L.control({position: 'bottomleft'});

// radio.onAdd = function (map) {

//     var div = L.DomUtil.create('div', 'info legend');
    

//     // loop through our density intervals and generate a label with a colored square for each interval
//     div.innerHTML = 'Select the Indicator<br><br><input type="radio" name="indicator" id="positive" onclick="getstyle(`feature,positive`)" checked><b>Positive</b>';
//     div.innerHTML += '<br><input type="radio" name="indicator"  id="active" onclick="getstyle(`feature,active`)"><b>Active Cases</b>';
//     div.innerHTML += '<br><input type="radio"  name="indicator"  id="recovered" onclick="getstyle(`feature , recovered`)"><b>Recovered</b>';
//     div.innerHTML += '<br><input type="radio" name="indicator"  id="death" onclick="getstyle(`feature , death`)"><b>Deaths</b>';

//     return div;
// };

// radio.addTo(mymap);


},
error : function(err){
  console.log(err);
}
})
    

