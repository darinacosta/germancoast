define(['jquery', 'map', 'controllers/layerStateControl'],

  function($, map, layerStateControl)
  {

    var layerControl = map.layerControl,
        map = map.map,

    hideAllLayers = function(){
      //Two functions for now until all layers get migrated into germancoastapps.layers
      console.log(germancoastapp.layers);
      $.each(layerStateControl, function(key, val) {map.removeLayer(layerStateControl[key])});
      $.each(germancoastapp.layers, function(key, val) {map.removeLayer(germancoastapp.layers[key])});
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
