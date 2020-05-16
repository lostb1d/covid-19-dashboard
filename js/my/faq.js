$.ajax({
    url : "https://nepalcorona.info/api/v1/faqs",
    method: "GET",
    success : function(faq_data){
        var faq_html = '';
        var i=0;
        faq_data.data.forEach(faq => {
            i++;
            faq_html += '<div class="card shadow mb-4">';
            faq_html +=  '<a href="#myth'+ i + '" class="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="collapseOne" data-target'+ faq._id + '>';
            faq_html += '<h6 class="m-0 font-weight-bold text-primary">' + faq.question_np +'</h6></a><div class="collapse hide" id="myth'+ i +'">';
            faq_html += '<div class="card-body">' + faq.answer_np + '</div> </div>  </div>';
     
        });
        $('#faq_data').append(faq_html);
       
        console.log(faq_data.data);
    },
    error : function(err){
      console.log(err);
    }
  })
