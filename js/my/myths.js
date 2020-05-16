$.ajax({
    url : "https://nepalcorona.info/api/v1/myths",
    method: "GET",
    success : function(myths_data){
        var myths_html = '';
        var i=0;
        myths_data.data.forEach(myths => {
            i++;
            myths_html += '<div class="card shadow mb-4">';
            myths_html +=  '<a href="#myth'+ i + '" class="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="collapseOne" data-target'+ myths._id + '>';
            myths_html += '<h6 class="m-0 font-weight-bold text-primary">' + myths.myth +'</h6></a><div class="collapse hide" id="myth'+ i +'">';
            myths_html += '<div class="card-body">' + myths.reality + '</div> </div>  </div>';
     
        });
        $('#myths_data').append(myths_html);
       
        console.log(myths_data.data);
    },
    error : function(err){
      console.log(err);
    }
  })
