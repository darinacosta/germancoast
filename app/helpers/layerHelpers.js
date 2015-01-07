define(['jquery', 'map', 'layers/layers'],

  function($, map, layers)
  {

    var layerControl = map.layerControl,
        map = map.map,

    hideAllLayers = function(){
      $.each(layers, function(key, val) {map.removeLayer(layers[key])});
    },

    populateLayerControl = function(layers){
      $.each(layers, function(alias, layer){
        layerControl.addOverlay(layer, alias);
      });
    },

    selectPolyOnClick = function(args){
	    
	    var targetLayer = args['targetLayer'],
	        selectedColor = args['selectedColor'],
	        selectedFill = args['selectedFill'],
	        originalColor = args['originalColor'],
	        originalFill = args['originalFill'];

	    targetLayer.on("click", function(e){

        var targetPoly = e.layer,
            clickLocation = new L.LatLng(e.latlng['lat'],e.latlng['lng']);

	      targetLayer.setStyle({
      	  color: originalColor,
          fillColor: originalFill
        });

	      targetPoly.setStyle({
	        'fillColor': selectedFill,
	        'color': selectedColor
	      });

	      map.setView(clickLocation, 14);
	    
	    })
	  };

    return {hideAllLayers: hideAllLayers,
            selectPolyOnClick: selectPolyOnClick,
            populateLayerControl: populateLayerControl};
  });
