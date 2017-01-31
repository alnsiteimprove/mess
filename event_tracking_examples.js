/* check jQuery version by typing:
 * jQuery.fn.jquery 
 * in webbrowser console on the site
 * Here are guidelines of differences:
 * $( selector ).live( events, data, handler );                // jQuery 1.3+
 * $( document ).delegate( selector, events, data, handler );  // jQuery 1.4.3+
 * $( document ).on( events, selector, data, handler );        // jQuery 1.7+
 * if it gives you error, then it means that you need to use plain JavaScript
 */


/* log data to SI :
 * c - category
 * a - action
 * l - label
 */
function log(c, a, l){
	_sz.push(['event, c, a, l]);
}

/* tracking clicks on email links (jQuery versions 1.7 and higher)
 * 'mousedown' is type of event that should trigger event tracking, 
 * for more type of events go to: http://api.jquery.com/category/events/
 * 'a[href^=mailto]' is a CSS seletor for <a href="mailto:...">...</a>
 * instead of 'a[href^=mailto]' you can use any CSS selector (that find element that customer wants to track ;)
 * General schema looks like that:
	jQuery(document).on( event, selector, function(){ 
		log(category, label, action);		  
	});
 */
jQuery(document).on('mousedown', 'a[href^=mailto]', function(){ 
	log('Link', 'Email', jQuery(this).text());		  
});




/* tracking scroll events on 25%, 50%, 75% and 100% scrolled:
 * You can copy below example, the only thing that needs to be changed are values send to customer in
 * log('Scroll', 'scroll', ..);
 *
*/
var height = jQuery(document).height() - jQuery(window).height();
var scroll = 0;
var third = height - height/4;
            
jQuery(window).scroll(function() {
	if((scroll < height/4 && jQuery(window).scrollTop() > height/4) || (scroll > height/4 && jQuery(window).scrollTop() < height/4)){
		scroll =  jQuery(window).scrollTop();          
		log('Scroll', 'scroll', '25%'); // change values send to customer
	}
	if((scroll <  height/2 && jQuery(window).scrollTop() > height/2) || (scroll >  height/2 && jQuery(window).scrollTop() < height/2)){
		scroll =  jQuery(window).scrollTop();  
		log('Scroll', 'scroll', '50%'); // change values send to customer
	}
	if((scroll < third && jQuery(window).scrollTop() > third) || (scroll > third && jQuery(window).scrollTop() < third)){
		scroll   =  jQuery(window).scrollTop();          
		log('Scroll', 'scroll', '75%'); // change values send to customer
	}
	if(jQuery(window).scrollTop() + jQuery(window).height() == jQuery(document).height()) {
		scroll = jQuery(window).scrollTop();
		log('Scroll', 'scroll', '100%'); // change values send to customer
	}
});
