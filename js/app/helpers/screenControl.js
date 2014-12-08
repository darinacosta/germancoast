define(['app/helpers/layerControl',
	      'app/helpers/videoControl'],

	function(layerControl, videoControl){
    
    readyScreen = function(args){
      
    	var lat = args['lat'],
    	    lng = args['lng'],
    	    zoom = args['zoom'];

      layerControl.hideAllLayers();
      videoControl.videoEventPopup._close();
      $mainMapTopRight.html('');
      window.scrollTo(0, 0);
      map.setView(new L.LatLng(lat, lng), zoom);
    }

    return{readyScreen: readyScreen}
 }
)
