define(['app/layers'],

  function(layers)
  {
    var hideAllLayers = function()
    {
      $.each(layers, function(key, val) {map.removeLayer(layers[key])});
    }
    return {hideAllLayers: hideAllLayers};
  });
