// Remove some tracked elements that are not real links and clutter visit data
// remove onclick tracking on menu elements
var expandableItems = document.getElementsByClassName('navigation__item--expandable');
var expandableLinks=[]; 
for(i=0;i<expandableItems.length;i++){
    expandableLinks.push([expandableItems[i].firstElementChild]);
}
_sz.analytics.config.noonclick = expandableLinks;

// add onclick tracking to some child elements
jQuery(document).on('mousedown', '#main-menu a', function(){
    if(jQuery(this).next().length<1){
        _sz.push(['request', {
            'ourl': jQuery(this).attr('href'),
            'ref': window.location.href,
            'autoonclick': 1,
            'rt': null
        }]);
    }
});