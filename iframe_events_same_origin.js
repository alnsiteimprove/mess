    // https://siteimprove.zendesk.com/agent/tickets/235934
    if(window.location.href.indexOf('universitiesuk.ac.uk/Pages/newsletter-sign-up')>0){
        var iframe = document.getElementsByTagName('iframe')[1];
        var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDocument) {
            iframeContent = iframeDocument.getElementById('mc-embedded-subscribe');
            if(iframeContent){
                iframeContent.addEventListener('mousedown', function(){
                    log('Button', 'click', 'Subscribe');
                });
            }
        }
    }
