//https://siteimprove.zendesk.com/agent/tickets/260063
function log(c, a, l){
    _sz.push(['event', c, a, l]);
}

var typingTimer;                //timer identifier
var doneTypingInterval = 1500;  //time in ms, 1.5 second for example, must be bigger than sendValuesTimeout
var sendValuesTimeout = 1300;	//time in ms, 1.3 second, must be lower than  doneTypingInterval
var sw = "";

//on keyup, start the countdown
document.getElementById('q').addEventListener('keyup', function () {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//user is "finished typing," or presses enter
function doneTyping () {
    setTimeout(function(){
        clearTimeout(typingTimer);
        if(sw.trim().length>1){
            var num = document.getElementsByClassName('search-results')[0].getElementsByTagName('h3').length>0 ?  document.getElementsByClassName('search-results')[0].getElementsByTagName('h3')[0].innerText.match(/\d+/g)[2] : 0;
            log('Search', 'search word: ' + sw,'search results: ' + num);
        }
    }, sendValuesTimeout);
}

// attach event to input field
document.getElementById('q').addEventListener('keydown', function(event){
    clearTimeout(typingTimer);
    var keycode = (event.keyCode ? event.keyCode : event.which);
    // if user press enter
    if(keycode === 13){
        clearTimeout(typingTimer);
        doneTyping();
	}else if( event.key.length < 2){
        // if user press any other key, then track what word they type
        sw += event.key;   
	}else if(event.key == "Backspace" || event.key == "Delete"){
        // remove last character if Backspace or Delete were pressed
        if(sw.length>0){ sw = sw.slice(0,sw.length-1); }
	}else if(event.key == "Control"){
        sw=""; // just in case clear words if Ctrl was pressed   
	}
});
// remove whole word if customer highlights some letters
var md_x = 43; // position where text starts
var mu_x = 43;

document.getElementById('q').addEventListener('mousedown', function(ev){
    md_x = ev.clientX;
});

document.getElementsByClassName('site-search')[0].addEventListener('mouseup', function(ev){
    mu_x = ev.clientX;
    if(( mu_x > md_x + sw.length * 70 -50) || (md_x > mu_x + sw.length * 70-50)){
         sw=""; // if customer moves mouse over words for more than one letter, just in case remove all letters
    }
});
// just in case remove whole word on double clikc
document.getElementById('q').addEventListener('dblclick', function(){
    md_x = 43;
    mu_x = 43;
    sw = "";
});
