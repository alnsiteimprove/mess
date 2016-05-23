// Video tracking with adding id's to iframes
// get iframe id, of there is none, then create one
function getFrameID(id){
    if(document.getElementById(id) === null){
        jQuery('iframe[src*="youtube.com"]').attr('id', id);
    }
    return id;
}

// sendEvent bound to onStateChange video events 
function sendEvent(event) {
    switch(event.data){
        case 1: //play
            console.log(["event", "Video", "play", jQuery('iframe[src*="youtube.com"]').attr('src').replace(/\?.*/,'')]);
            break;
        case 2: //pause
            console.log(["event", "Video", "pause", jQuery('iframe[src*="youtube.com"]').attr('src').replace(/\?.*/,'')]);
            break;
        case 0: //stop
            console.log(["event", "Video", "stop", jQuery('iframe[src*="youtube.com"]').attr('src').replace(/\?.*/,'')]);
            break;

    }
}

//if there is video on the page, then add event tracking
if(jQuery('iframe[src*="youtube.com"]').length >0){ 
    // Define YT_ready function.
    // remember that it is variable with function inside, don't call it as function, but as variable
    var YT_ready = (function() {
        jQuery('iframe[src*="youtube.com"]').each(function(ind){
            if(jQuery(this).attr('id') === undefined || jQuery(this).attr('id') === false) { // when there are no id's for players
                jQuery(this).attr('id','player' + ind);
            }
        });
        
        var onReady_funcs = [], api_isReady = false;
        return function(func, b_before) {
            if (func === true) {
                api_isReady = true;
                while (onReady_funcs.length) {
                    // Removes the first func from the array, and execute func
                    onReady_funcs.shift()();
                }
            } else if (typeof func == "function") {
                if (api_isReady) func();
                else onReady_funcs[b_before?"unshift":"push"](func); 
            }
        };
    })();
    // This function will be called when the API is fully loaded
    function onYouTubePlayerAPIReady() {YT_ready = (true);}
    
    // Load YouTube Frame API
    (function() { // Closure, to not leak to the scope
      var s = document.createElement("script");
      s.src = (location.protocol == 'https:' ? 'https' : 'http') + "://www.youtube.com/player_api";
      var before = document.getElementsByTagName("script")[0];
      before.parentNode.insertBefore(s, before);
    })(); //run now
    
    var player; //Define a player object
    
    // Add function to execute when the API is ready
    YT_ready = (function(){
        var frameID = getFrameID('player0');
        setTimeout(function(){
             if (frameID) { //If the frame exists
                player = new YT.Player(frameID, {
                    events: {
                        "onStateChange": sendEvent
                    }
                });
            }
        },1000);
    })(); //run now
}
