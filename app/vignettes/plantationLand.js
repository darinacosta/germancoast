define(['jquery',
        'map',
        'controllers/layerStateControl',
        'controllers/stateControl',
        'helpers/layerHelpers',
        'helpers/imageHelpers',
        'text!assets/html/plantation-land.html',
        'magnificent'],

function($, map, layerStateControl, stateControl, layerHelpers, imageHelpers, plantationLandHtml){

	var map = map.map,
      $mapTab = stateControl.$mapTab,
      plantationsLayer = layerStateControl.layers['plantationsLayer'],

	initializeOpacityControl = $('.map-tab-content').on("input", '#opacity-bar', function() {
    opacityValue = $(this).val();
    plantationsLayer.setOpacity(opacityValue);
  }),


  init = function(){
  	$mapTab.html(plantationLandHtml);
	  stateControl.defaultState({
	    'lat':30.0039,
	    'lng': -90.4108, 
	    'zoom':12
	  });
    map.doubleClickZoom.disable();
	  plantationsLayer.addTo(map);
	  initializeOpacityControl;
    $('.map-tab-content .image-link').magnificPopup({type:'image'});
	};

	return {init: init};

});