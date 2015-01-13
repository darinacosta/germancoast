define(['jquery', 'map', 'controllers/layerStateControl'],

  function($, map, layerStateControl)
  {

    var layerControl = map.layerControl,
        map = map.map,
        layerControlList = [],
        targetLayer,
        selectPolyinitializedLayers = [],

    hideAllLayers = function(){
      $.each(layerStateControl.layers, function(key, val) {
        console.log(layerStateControl.layers[key]);
        map.removeLayer(layerStateControl.layers[key])
      });
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
	        originalFill = args['originalFill'],
          zoom = args['zoom'] !== 'undefined' ? args['zoom'] : 13,
      
      activationState = (function(){
        if ($.inArray(targetLayer, selectPolyinitializedLayers) === -1){
          selectPolyinitializedLayers.push(targetLayer);
          return false
        }else{
          return true;
        }
      })();

      //Reset potential style changes
      targetLayer.setStyle({
        color: originalColor,
        fillColor: originalFill
      });

      function handleLayerClick(e){

        var targetPoly = e.layer,
            clickLocation = [e.latlng['lat'],e.latlng['lng']];
        
        //Deselect previous poly
        targetLayer.setStyle({
          color: originalColor,
          fillColor: originalFill
        });

        targetPoly.setStyle({
          'fillColor': selectedFill,
          'color': selectedColor
        });

        map.setView(clickLocation, zoom);
      
      };
 
      //If the layer has already been initialized, pass.
      if (activationState === false){
        targetLayer.on("click", handleLayerClick);
        console.log('Target layer initialized');
      };
	  };

    return {hideAllLayers: hideAllLayers,
            selectPolyOnClick: selectPolyOnClick,
            populateLayerControl: populateLayerControl};
  });
