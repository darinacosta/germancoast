define(['jquery',
        'map',
        'controllers/layerStateControl',
        'helpers/stateControl',
        'helpers/layerHelpers',
        'helpers/imageHelpers',
        'text!assets/html/plantation-land.html',
        'magnificent'],

function($, map, layerStateControl, stateControl, layerHelpers, imageHelpers, plantationLandHtml){

	var map = map.map,
      $mapTab = stateControl.$mapTab,

	activateOpacityControl = $('.map-tab-content').on("input", '#opacity-bar', function() {
    opacityValue = $(this).val();
    layerStateControl.plantationsLayer.setOpacity(opacityValue);
  }),


  init = function(){
  	$mapTab.html(plantationLandHtml);
	  stateControl.defaultState({
	    'lat':30.0039,
	    'lng': -90.4108, 
	    'zoom':12
	  });
    map.doubleClickZoom.disable();
	  layerStateControl.plantationsLayer.addTo(map);
	  activateOpacityControl;
    $('.map-tab-content .image-link').magnificPopup({type:'image'});
	};

	return {init: init};

});