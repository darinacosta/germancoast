define([
        'app/helpers/layerHelpers',
	      'app/helpers/videoHelpers'],

	function(layerHelpers, videoHelpers){
    
    readyScreen = function(args){
      
    	var lat = args['lat'],
    	    lng = args['lng'],
    	    zoom = args['zoom'];

      layerHelpers.hideAllLayers();
      videoHelpers.videoEventPopup._close();
      $mainMapTopRight.html('');
      $('.tab-pane').scrollTop(0);
      map.setView(new L.LatLng(lat, lng), zoom);
    }

    return{readyScreen: readyScreen}
  }
)
