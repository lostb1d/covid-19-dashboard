$.ajax({
    url : "https://data.nepalcorona.info/api/v1/covid/timeline",
    method: "GET",
    success : function(data1){
        var corona_date = [];
        var corona_total_cases = []
        data1.forEach(data => {
            if(data.newCases != 0 ){
                corona_date.push(data.date);
                corona_total_cases.push(data.totalCases);
            }
        });
        console.log(corona_date);
        console.log(corona_total_cases);
                
        makeBarChart(corona_date , corona_total_cases , corona_total_cases.length);
        makePieChart(corona_date , corona_total_cases , corona_total_cases.length);
      // console.log(data1);
    },
    error : function(err){
      console.log(err);
    }
  })


function makeBarChart(labels,data , l){
let labels2 = labels;
let data2 = data;

var numberOfItems = l;
var rainbow = new Rainbow(); 
rainbow.setNumberRange(1, numberOfItems);
rainbow.setSpectrum('red', 'black');
var color = [];
for (var i = 1; i <= numberOfItems; i++) {
    var hexColour = rainbow.colourAt(i);
    s = '#' + hexColour ;
    color.push(s);
}

let colors2 = color;

let myChart2 = document.getElementById("myBarChart").getContext('2d');

let chart2 = new Chart(myChart2,{
    type : 'bar',
    data :{
        labels: labels2,
        datasets : [{
            data : data2,
            backgroundColor : colors2,
        }]
    },
    options : {
        title : {
            text : "No of People Tested Positive for COVID -19 in Nepal",
            display : true,
            size : 24,
        },
        legend :{
            display:false,
        } 
    }
})
}


//pie chart starts


function makePieChart(data){
    let labels2 = ['Tested Positive' , 'In Isolation' , 'Recovered', 'Deaths'];
    let data2 = data;
    
    var numberOfItems = 3;
    var rainbow = new Rainbow(); 
    rainbow.setNumberRange(1, numberOfItems);
    rainbow.setSpectrum('red', 'black');
    var color = [];
    for (var i = 1; i <= numberOfItems; i++) {
        var hexColour = rainbow.colourAt(i);
        s = '#' + hexColour ;
        color.push(s);
    }
    
    let colors2 = [ 'Yellow' ,'Blue' , 'Green','Red'];
    
    let myChart2 = document.getElementById("mypieChart").getContext('2d');
    
    let chart2 = new Chart(myChart2,{
        type : 'doughnut',
        data :{
            labels: labels2,
            datasets : [{
                data : data2,
                backgroundColor : colors2,
            }]
        },
        options : {
            // title : {
            //     text : "No of People Tested Positive for COVID -19 in Nepal",
            //     display : true,
            //     size : 24,
            // },
            legend :{
                display:false,
            } 
        }
    })
    }
    

//pie chart ends


// ----------------------header details -----------------------

$.ajax({
    url : "https://nepalcorona.info/api/v1/data/nepal",
    method: "GET",
    success : function(header_data){
        $('#total_tested').html(header_data.tested_total);
        $('#tested_positive').html(header_data.tested_positive);
        $('#deaths').html(header_data.deaths);
        $('#recovered').html(header_data.recovered);
        var dataForPie = [header_data.tested_positive , header_data.in_isolation,  header_data.recovered, header_data.deaths];
        makePieChart(dataForPie);

    },
    error : function(err){
      console.log(err);
    }
  })


// --------------------- header details end --------------------------




// --------------------- main page news --------------------------


  $.ajax({
    url : "https://nepalcorona.info/api/v1/news",
    method: "GET",
    success : function(news_data){
       makeNews(news_data.data);
       console.log(news_data);
    },
    error : function(err){
      console.log(err);
    }
  })



function makeNews(news){
    var news_html ='';
    for(var i = 0; i<10 ; i++){
        news_html += '<h6 class="news_title"><strong>'+ (i+1) + ' &nbsp<a href="'+ news[i].url + '"  target="_new">'+ news[i].title + '</a></strong></h6></div>';
    }
    $('#corona_news_main_page').append(news_html);
}








// ---------------------- main page news  ends ----------------------



// ----------- world corona info ------------------- 


$.ajax({
    url : "https://data.nepalcorona.info/api/v1/world",
    method: "GET",
    success : function(world_data){
        $('#wTotalCases').html(world_data.cases);
        $('#wNewCases').html(world_data.todayCases);
        $('#wDeaths').html(world_data.deaths);
        $('#wTodayDeaths').html(world_data.todayDeaths);
        $('#wRecovered').html(world_data.recovered);
        $('#wActive').html(world_data.active);
        $('#wCritical').html(world_data.critical);
        $('#wTests').html(world_data.tests);

    },
    error : function(err){
      console.log(err);
    }
  })





// ------------------- world corona info ends --------------------- 

