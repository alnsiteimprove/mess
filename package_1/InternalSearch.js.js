/* dynamic internal search
 * for working version remove all comment marks '/*' '* /'
 * and comment out console.log 
 */ 
jQuery(function($){
    // look for changes in fields
	var checkFields = function() {
		// on page load
        $(document).ready(function(){
            collectValues();  
        });
		
        // mouse click on search icon
    	$('article input[type="submit"]').mousedown(function () {
			collectValues();
		});
	
		// when user presses Enter
		$('article input[type="text"]').keydown(function (event) {
			var keycode = (event.keyCode ? event.keyCode : event.which);
			// check if key pressed was Enter
			if(keycode === 13){
				collectValues();
			}
		});
	};	
	
    // collect search results in fields and send them
    var collectValues = function(){  
		setTimeout(function(){     
			if($('article input[type="text"]').val().length>0){
				// ensure that image analytics data will be send
				/*_sz.analytics.state.tracked = false;
				_sz.analytics.config.cantrack = true;
				*/
				var q = $('article input[type="text"]').val();
				var num = ($('p.result-count')[0] == undefined ? '0' : $('p.result-count').text().match(/\d+/)[0]);
			
			console.log(['sw', q]);
				console.log(['hits', num]);
				/*_sz.push(['sw', q]);
				_sz.push(['hits', num]);
				_sz.push(['trackpageview']);
                _sz.push(['notrack', false]);
			*/}
		},1000);
	};
	
    // if windows location is search side, then look for what user was searching for  
    if(window.location.href.indexOf('Sok/?q=') > -1){
    	// disable sending image only on pageload
		/*_sz.analytics.config.cantrack = false;
        _sz.analytics.state.tracked = true;  
        */
        // check what user was searching for
		setTimeout(checkFields, 1000);   	
    }
});