function log(c, a, l){
  _sz.push(['event, c, a, l]);
}

// tracking accordion elements:


// tracking navigation buttons:


// tracking scroll events on 25%, 50%, 75% and 100% scrolled:
var height = jQuery(document).height() - jQuery(window).height();
var scroll = 0;
var third = height - height/4;
jQuery(window).scroll(function() {
      if((scroll < height/4 && jQuery(window).scrollTop() > height/4) || (scroll > height/4 && jQuery(window).scrollTop() < height/4)){
            scroll =  jQuery(window).scrollTop();          
            log('Scroll', 'scroll', '25%');
       }
       if((scroll <  height/2 && jQuery(window).scrollTop() > height/2) || (scroll >  height/2 && jQuery(window).scrollTop() < height/2)){
            scroll =  jQuery(window).scrollTop();  
           	log('Scroll', 'scroll', '50%');
       }
       if((scroll < third && jQuery(window).scrollTop() > third) || (scroll > third && jQuery(window).scrollTop() < third)){
            scroll   =  jQuery(window).scrollTop();          
            log('Scroll', 'scroll', '75%');
       }
       if(jQuery(window).scrollTop() + jQuery(window).height() == jQuery(document).height()) {
            scroll = jQuery(window).scrollTop();
           	log('Scroll', 'scroll', '100%');
       }
  });
