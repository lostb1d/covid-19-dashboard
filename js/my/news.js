$.ajax({
    url : "https://nepalcorona.info/api/v1/news",
    method: "GET",
    success : function(news_data){
        var news_html = '';
        news_data.data.forEach(news => {
                news_html += '<div class="card d-block m-auto" style="width: 18rem;">';
                news_html += '<img class="card-img-top" src="'+ news.image_url + '" alt="Card image cap">';
                news_html += '<div class="card-body">'
                news_html += '<h5 class="news-card-title"><strong>' + news.title + '</strong></h5>';
                news_html += '<p class="card-text">' + news.summary + '</p>';
                news_html += '<a target="_new" href="'+ news.url + '" class="btn btn-primary">See More</a>';
                news_html += ' </div>            </div>';
        });
        $('#corona_news').append(news_html);
       
        console.log(news_data.data);
    },
    error : function(err){
      console.log(err);
    }
  })


