/* internal search when search results appear also while user is only typing search words
 * for working version remove all comment marks '/*' '* /'
 * and comment out console.log 
 */ 
var idleTime = 0;
var lastWord = "";

function timerIncrement() {
    idleTime = idleTime + 1000;
}
var idleInterval = setInterval(timerIncrement, 1000); // 1 minute

// zero idle time on keydown
document.addEventListener("keydown", function(){
	idleTime = 0;
});

// zero idle time on mouse click
document.addEventListener("mousedown", function(){
	idleTime = 0;
});

// listen to mouse clicks only if idle time was small- otherwise they are focusing their coursor again
document.getElementById('q').addEventListener("click", function(){
	idleTime = 0;
	// if last word didn't change then 
	if(lastWord!==document.getElementById('q').value){
		collectValues();
	}
});

document.getElementById('search-submit').addEventListener("click", function(){
	idleTime = 0;
	collectValues();
});

// if keydown that is not Enter and then becoming idle, then use it as search results
document.getElementById('q').addEventListener("keydown", function(event){
	idleTime = 0;
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode === 13){
		collectValues();
	}
});

document.getElementById('q').addEventListener("keydown", function(event){
	idleTime = 0;
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode !== 13){
		setTimeout(function(){
			if(idleTime > 3000){
				//if(lastWord!==document.getElementById('q').value){
					collectValues();
				//}
			}
		},4000)
	}
});
	
// collect search results in fields and send them
var collectValues = function(){  
	if( (document.getElementById('q').value !=="") && (lastWord!==document.getElementById('q').value) ){
		lastWord = document.getElementById('q').value; 
		var num = document.getElementsByClassName('sqr-info')[0].innerText.match(/\d+/g)[0];
		
		console.log(lastWord + ' ' + num);
		/*_sz.push(['sw', q]);
		_sz.push(['hits', num]);
		_sz.push(['trackpageview']);
        _sz.push(['notrack', false]);
        */
	}
}

