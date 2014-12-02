define(['app/layers'],

  function(layers){
    hideAllLayers = function(){
      $.each(layers, function(key, val) {
        map.removeLayer(layers[key])
      });
    };

    return{
      hideAllLayers: hideAllLayers
    }

});
