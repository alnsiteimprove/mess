function track(c, a, l){
    _sz.push(['event', c, a, l]);
}

// add youtube API script to HTML
function addYouTubeAPIScript() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

if(window.jQuery){ // it can be any condition, jQuery is in fact not needed here           

    var videos = document.getElementsByTagName('iframe');  // list of all videos
    var videosToTrack = [];  // list of youtube video Id's on site

    // do following when video event is triggered
    var getEvent = function(event){
        var videoData = event.target.getVideoData();
        switch (event.data) {
            case 0:
                track('Video', 'Ended', "Title: " + videoData.title); // change categories and labels here
                break;
            case 1:
                track('Video', 'Play', "Title: " + videoData.title);
                break;
            case 2:
                track('Video', 'Paused', "Title: " + videoData.title);
                break;
        }
    };

    // assign function and set up player for each of youtube videos
    var setOnYouTubeIframeAPIReady = function() {
        window.onYouTubeIframeAPIReady = function() {
            for (var i = 0; i < videosToTrack.length; i++) {
                new YT.Player(videosToTrack[i], { events: { 'onStateChange': getEvent } });
            }
        };
    };

    if(videos.length > 0){
        addYouTubeAPIScript();  //add YoutubeApi script if there are videos on site
        for (k = 0; k < videos.length; k++) {
            if(videos[k].hasAttribute('src') && videos[k].getAttribute('src').match(/youtube/)){
                if(!videos[k].hasAttribute('id')){  // if there is no 'id', then set it
                    videos[k].setAttribute('id', 'player'+ k );
                }
                videosToTrack.push(videos[k].getAttribute('id'));
            }
        }
        setOnYouTubeIframeAPIReady(); // set videos to be tracked
    }
}
