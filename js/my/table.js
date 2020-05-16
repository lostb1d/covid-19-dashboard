// var myArray = []
// $.ajax({
//   method : 'GET',
//   url :'https://nepalcorona.info/api/v1/data/world',
//   success: function(response){
//     myArray = response;
//     console.log(myArray.country);
//   }
// })

// $.ajax({
//     url : "https://nepalcorona.info/api/v1/data/world",
//     method: "GET",
//     success : function(world_data){
//        buildTable(world_data);
//         console.log(world_data);
//     },
//     error : function(err){
//       console.log(err);
//     }
//   })


//   function buildTable(data){
//     var table = document.getElementById('world_data');
//     var row = '';
//     for(var i = 1; i<data.length; i++){
//      row +=`<tr>
//                   <td>${data[i].country}</td>
//                   <td>${data[i].totalCases}</td>
//                   <td>${data[i].newCases}</td>
//                   <td>${data[i].totalDeaths}</td>
//                   <td>${data[i].activeCases}</td>
//                   <td>${data[i].totalRecovered}</td>
//                   <td>${data[i].tests}</td>
//                   </tr>`
        
//     }
//     table.innerHTML +=row;      
//   }


  $(document).ready(function(){
    $('#dataTable').DataTable({
      'processing' : true,
      'serverSide' : true,
      'serverMethod' : 'GET',
      'ajax' : {
        url : 'https://nepalcorona.info/api/v1/data/world',
        dataSrc : '',
      },
      'columns' : [
        { data : 'country'},
        { data : 'totalCases'},
        { data : 'newCases'},
        { data : 'totalDeaths'},
        { data : 'activeCases'},
        { data : 'totalRecovered'},
        { data : 'tests'}

      ]

    })
  })

