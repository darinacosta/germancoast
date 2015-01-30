define(['jquery',
        'map',
        'helpers/layerHelpers',
	      'helpers/videoHelpers'],

	function($, map, layerHelpers, videoHelpers){
    
    var layerControl = map.layerControl,
        map = map.map,
        $mapTab = $('#map-tab-content-dynamic'), //clean this up: defining map tab twice
        $mapTabContent = $('.map-tab-content'),
        $mainMapTopRight = $('#map .leaflet-top.leaflet-right').not('.leaflet-control-minimap .leaflet-top.leaflet-right'),
        $mapHomeButton = $('#map-home-button'),
        $mapLegend = $('#map-legend'),

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

    clearLayerControl = function(clearLayers){
      if (clearLayers !== false){
        $.each(layerControl._layers, function(key, value){
          if (layerControl._layers[key].name !== 'Labels'){
            layerControl.removeLayer(layerControl._layers[key].layer);
          }
        })
      }
    },

    zoomAndHideLayers = function(args){
      var lat = args['lat'],
          lng = args['lng'],
          zoom = args['zoom'];

          map.setView(new L.LatLng(lat, lng), zoom);
          layerHelpers.hideAllLayers();
    },

    defaultState = function(args){
      
    	var lat = args['lat'],
    	    lng = args['lng'],
    	    zoom = args['zoom'],  
          clearLayers = args['clearLayerControl'];

      hideStaticContent();
      clearLayerControl(clearLayers);
      $mapLegend.html('');
      $mapLegend.css('display', 'none');
      map.doubleClickZoom.enable();
      layerHelpers.hideAllLayers();
      videoHelpers.videoEventPopup._close();
      map.off('overlayadd');
      $mapTabContent.scrollTop(0);
      map.setView(new L.LatLng(lat, lng), zoom);
      $mapHomeButton.unbind();
      $mapHomeButton.on('click', function(){
        map.setView(new L.LatLng(lat, lng), zoom);
      });
    };

    return{defaultState: defaultState,
           zoomAndHideLayers: zoomAndHideLayers,
           $mapTab: $mapTab,
           $mainMapTopRight: $mainMapTopRight,
           $mapLegend: $mapLegend}
  }
)
