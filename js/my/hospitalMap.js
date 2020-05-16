$.ajax({
    url : "https://nepalcorona.info/api/v1/hospitals",
    method: "GET",
    success : function(hospital_data){   
        
        var lat = [];
        var lng = []; 
        var hospitalName = [];
        var contactPerson = [];
        hospital_data.data.forEach(hospital => {
            // console.log(hospital.location.coordinates[0]);
            lat.push(hospital.location.coordinates[0]);
            lng.push(hospital.location.coordinates[1]);
            hospitalName.push(hospital.name);
            contactPerson.push(hospital.contact_person);
        });
        mapHospitals(lat,lng,hospitalName, contactPerson);
    },
    error : function(err){
      console.log(err);
    }
  })
// ------------- leaflet map ---------------- 

var mymap = L.map('mapid').setView([28.514,83.573], 6);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibG9zdGIxIiwiYSI6ImNrNnExMnV5bzBqbzIza3FvcGN5anA3ZnQifQ.2yLw1_lvLxOcdWNhupE3kA'
}).addTo(mymap);



function  mapHospitals(lat,lng,hospitalName, contactPerson){
    var hospitalIcon = L.icon({
        iconUrl : 'hospital.png',
        iconSize : [25,25],
        iconAnchor : [22,15],
        popupAnchor : [-7, -15]
    })
    for(var i = 0;i<lat.length; i++){
        
        var markerLocation = new L.LatLng(lat[i],lng[i]);
        console.log(markerLocation);
        var marker = new L.Marker(markerLocation, {icon : hospitalIcon}).bindPopup(hospitalName[i]);
        mymap.addLayer(marker);
        
    }
   
}