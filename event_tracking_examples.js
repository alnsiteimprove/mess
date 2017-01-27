function log(c, a, l){
  _sz.push(['event, c, a, l]);
}

// tracking accordion elements:


// tracking navigation buttons:


// tracking scroll events:
    // get page height
    var body = document.body,html = document.documentElement;
    var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
    var quarter = height/4;
    var half = height/2;
    var third = quarter + half;
    
    jQuery(window).scroll(function() {
      if(jQuery(window).scrollTop()  == height/4){
           log('Scroll', 'scroll', '25%');
       }
       if(jQuery(window).scrollTop() == height/2){
           log('Scroll', 'scroll', '50%');
       }
       if(jQuery(window).scrollTop() == (height - height/4)){
           log('Scroll', 'scroll', '75%');
       }
       if(jQuery(window).scrollTop() + jQuery(window).height() == jQuery(document).height()) {
           log('Scroll', 'scroll', '100%');
       }
  });
