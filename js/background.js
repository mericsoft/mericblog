chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('window.html', {
      id:'mericblog',
    frame:'none',
    resizable:false,
      'outerBounds': {
      'minWidth': 432,
      'minHeight': 700,
      'maxWidth':432,
      'maxHeight':700

    }
    
  });



});

      chrome.app.runtime.onEmbedRequested.addListener(function(request) {
        // Allows the embedder to embed foo.html.
        request.allow("window.html");
      });
      
