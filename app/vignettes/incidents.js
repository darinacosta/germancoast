define(['leaflet',
	      'jquery',
        'map',
        'controllers/layerStateControl',
        'controllers/stateControl',
        'helpers/layerHelpers',
        'helpers/imageHelpers',
        'text!assets/html/incidents.html'],

function(L, $, map, layerStateControl, stateControl, layerHelpers, imageHelpers, incidentsHtml){
	        
	var map = map.map,
	$mapTab = stateControl.$mapTab,
	layers = layerStateControl.layers,
	layerState,

	initializeLayers = function(callback){
    if (layerState !== 'initialized'){
      //lazy-loading layers
      layerStateControl.initializeIncidentLayers(true, function(){
        moduleLayers = {
          'Incidents': layers['incidents'],
        };
        layerHelpers.populateLayerControl(moduleLayers);
        layerState = 'initialized';
        callback();
      })
    }else{
      layerHelpers.populateLayerControl(moduleLayers);
      callback();
    }
  },

	init = function(){

        
    stateControl.defaultState({
      'lat':30.0039,
      'lng':-90.4108, 
      'zoom':12,
    });
    
    initializeLayers(function(){
    	layers['incidents'].addTo(map);
    	layers['incidents'].on('click', function(e) {
        map.panTo(e.layer.getLatLng());
      });
    });
    
    $mapTab.html(incidentsHtml);

  }

  return {init:init}
})