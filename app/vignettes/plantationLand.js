define(['jquery',
        'map',
        'layers/layers',
        'helpers/stateControl',
        'helpers/layerHelpers',
        'helpers/imageHelpers',
        'text!assets/html/plantation-land.html'],

function($, map, layers, stateControl, layerHelpers, imageHelpers, plantationLandHtml){

	var $mapTab = stateControl.$mapTab,

	activateOpacityControl = $('.map-tab-content').on("input", '#opacity-bar', function() {
    opacityValue = $(this).val();
    layers.plantationsLayer.setOpacity(opacityValue);
  }),


  init = function(){
  	$mapTab.html(plantationLandHtml);
  	map.doubleClickZoom.disable();
	  stateControl.readyScreen({
	    'lat':30.0039,
	    'lng': -90.4108, 
	    'zoom':12
	  });
	  layers.plantationsLayer.addTo(map);
	  activateOpacityControl;
	};

	return {init: init};

});