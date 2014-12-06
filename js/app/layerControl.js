define(['app/layers'],

  function(layers)
  {

    var hideAllLayers = function()
    {
      $.each(layers, function(key, val) {map.removeLayer(layers[key])});
    },

    selectPolyOnClick = function(targetLayer, selectedColor, selectedFill){
	    

	    targetLayer.on("click", function(e){
        //console.log(e);
        console.log(targetLayer.style);
        var targetPoly = e.layer,
            originalFill = targetLayer.options.fillColor,
            originalColor = targetLayer.options.color;

	      targetLayer.setStyle({
      	  color: originalColor,
          fillColor: originalFill});

	      targetPoly.setStyle({
	        'fillColor': selectedFill,
	        'color': selectedColor
	      });

	      map.setView(new L.LatLng(e.latlng['lat'],e.latlng['lng']),14);
	    
	    })
	  };

    return {hideAllLayers: hideAllLayers,
            selectPolyOnClick: selectPolyOnClick};
  });
