define({
  //Use this class to instantiate video events at a specified time. Meant to be passed to 'runAtTime' function. 
  videoUpdateHandler: function(handler, time){
    this.handler = handler;
    this.time = time;
  },

  //Use this as the callback in a video's "on time update" function. 'This' refers to the video. 
  runAtTime: function(handler, time) {
    var wrapped = function() {
      if(this.currentTime >= time) {
        $(this).off('timeupdate', wrapped);
        return handler.apply(this, arguments);
      }
    }
    return wrapped;
  },
  
  //Use this to serve animated GIFs hosted on S3.
  returnVideoString: function(video){
    return '<video muted style="width:100%;" autoplay="autoplay" loop=""><source src="https://s3-us-west-2.amazonaws.com/darinacostamediafiles/video/'+video+'.webm" type="video/webm"><source src="https://s3-us-west-2.amazonaws.com/darinacostamediafiles/video/'+video+'.ogv" type="video/ogg">Your browser does not support the video tag.</video>'
  },

  //A popup for displaying video/gif content.
  videoEventPopup: L.popup({
    maxHeight:200,
    minWidth:250,
    closeButton:false,
    closeOnClick:false
  })
});