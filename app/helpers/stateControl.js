define(['jquery',
        'map',
        'helpers/layerHelpers',
	      'helpers/videoHelpers'],

	function($, map, layerHelpers, videoHelpers){
    
    var layerControl = map.layerControl,
        map = map.map,
        $mapTab = $('#map-tab-content-dynamic'),
        $mainMapTopRight = $('#map .leaflet-top.leaflet-right').not('.leaflet-control-minimap .leaflet-top.leaflet-right'),
        $mapHomeButton = $('#map-home-button'),

    currentMapView = {
      'lat': map.getCenter()['lat'],
      'lng': map.getCenter()['lng'],
      'zoom': map.getZoom()
    },

    hideStaticContent = function(){
      $hurricaneContent = $('#hurricane.live-content');
      var display = $hurricaneContent.css('display');
      if (display === 'block'){
        $hurricaneContent.css('display', 'none');
      }
    },

    clearLayerControl = function(){
      $.each(layerControl._layers, function(key, value){
        if (layerControl._layers[key].name !== 'Labels'){
          layerControl.removeLayer(layerControl._layers[key].layer);
        }
      });
    },

    defaultState = function(args){
      
    	var lat = args['lat'],
    	    lng = args['lng'],
    	    zoom = args['zoom'],
          moduleLayers = args['layers'],  
          viewEquality = currentMapView.lat === lat && currentMapView.lng === lng && currentMapView.zoom === zoom;
      
      console.log(moduleLayers);

      hideStaticContent();
      clearLayerControl();
      if (moduleLayers !== undefined){
        layerHelpers.populateLayerControl(moduleLayers);
      }; 
      map.doubleClickZoom.enable();
      layerHelpers.hideAllLayers();
      videoHelpers.videoEventPopup._close();
      //$mainMapTopRight.html('');

      $('.map-tab-content').scrollTop(0);
      map.setView(new L.LatLng(lat, lng), zoom);

      $mapHomeButton.unbind();
      $mapHomeButton.on('click', function(){
        if (viewEquality === false){
          map.setView(new L.LatLng(lat, lng), zoom);
        };
      });
    };

    return{defaultState: defaultState,
           $mapTab: $mapTab,
           $mainMapTopRight: $mainMapTopRight}
  }
)
