define(['jquery', 'map', 'controllers/layerStateControl'],

  function($, map, layerStateControl)
  {

    var layerControl = map.layerControl,
        map = map.map,
        layerControlList = [],

    hideAllLayers = function(){
      //Two functions for now until all layers get migrated into germancoastapps.layers
      $.each(layerStateControl, function(key, val) {map.removeLayer(layerStateControl[key])});
      $.each(germancoastapp.layers, function(key, val) {map.removeLayer(germancoastapp.layers[key])});
    },

    compileLayerControlList = function(){
      $.each(layerControl._layers, function(key, val){
        layerControlList.push(layerControl._layers[key]['name']);
      });
    },

    populateLayerControl = function(layers){
      compileLayerControlList();
      $.each(layers, function(alias, layer){
        if ($.inArray(alias, layerControlList) !== false){
          layerControl.addOverlay(layer, alias);
        }
      })
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
