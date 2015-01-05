define(['jquery',
        'map',
        'helpers/layerHelpers',
	      'helpers/videoHelpers'],

	function($, map, layerHelpers, videoHelpers){
    
    var $mapTab = $('.map-tab-content'),
        $mainMapTopRight = $('#map .leaflet-top.leaflet-right').not('.leaflet-control-minimap .leaflet-top.leaflet-right'),

    currentMapView = {
      'lat': map.getCenter()['lat'],
      'lng': map.getCenter()['lng'],
      'zoom': map.getZoom()
    },

    readyScreen = function(args){
      
    	var lat = args['lat'],
    	    lng = args['lng'],
    	    zoom = args['zoom'],
          viewEquality = currentMapView.lat === lat && currentMapView.lng === lng && currentMapView.zoom === zoom;
      
      $('#map-home-button').unbind();
      map.doubleClickZoom.enable();
      layerHelpers.hideAllLayers();
      videoHelpers.videoEventPopup._close();
      //$mainMapTopRight.html('');

      $('.map-tab-content').scrollTop(0);
      map.setView(new L.LatLng(lat, lng), zoom);
      
      $('#map-home-button').on('click', function(){
        if (viewEquality === false){
          map.setView(new L.LatLng(lat, lng), zoom);
        };
      });
    };

    return{readyScreen: readyScreen,
           $mapTab: $mapTab,
           $mainMapTopRight: $mainMapTopRight}
  }
)
