define(['layers/layers'],

  function(layers){ return {

    hideAllLayers: function(){
      $.each(layers, function(key, val) {
        map.removeLayer(layers[key])
      });
    }
	}
});
