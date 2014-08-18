javascript:(function(){
  var hostname = window.location.hostname;
  if(hostname==='www.netflix.com'){
    console.log('Netflix!');
    // the minimum version of jQuery we want
    var v = "1.3.2";

    // check prior inclusion and version
    if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
      var done = false;
      var script = document.createElement("script");
      script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
      script.onload = script.onreadystatechange = function(){
        if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
          done = true;
          initMyBookmarklet();
        }
      };
      document.getElementsByTagName("head")[0].appendChild(script);
    } else {
      initMyBookmarklet();
    } 
  }

  function initMyBookmarklet() {
    window.myBookmarklet = function() {
      // your JavaScript code goes here!
      var $j = jQuery.noConflict();
      //alert($j('h1.title').text());
      var title = $j('h1.title').text();
      title = title.replace(/ /g, '+');
      var year = $j('span.year').text();
      console.log(title);
      console.log(year);
      var url = 'http://gdata.youtube.com/feeds/api/videos?q='+title+'+'+year+'+trailer&start-index=1&max-results=1&alt=json';
      console.log(url);
      $j.getJSON(url, function (result) {
        var videoURL = result.feed.entry[0].link[0].href;
        console.log(videoURL);
        //window.location.href = videoURL;
        videoURL = videoURL.replace('watch?v=','v/');
        var embedCode = '<object width="640" height="385"><param name="movie" value="'+videoURL+'?fs=1&amp;hl=en_US"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="'+videoURL+'?fs=1&amp;hl=en_US" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="640" height="385"></embed></object>';
        if($j('.close_box').length===0){
          $j('#displaypage-overview').before('<div align="center" class="vertical clearfix" style="margin-bottom:30px;">'+embedCode+'<div class="close_box" style="bottom:0;right:0;"><h2><a href="#">close trailer</a></h2></div></div>');
          
          $j(document).on('click','.close_box',function(){
              $j(this).parent().remove();
          });
        }
      });
    }();
  }

}());
