define(['leaflet',
	      'jquery',
        'map',
        'controllers/layerStateControl',
        'controllers/stateControl',
        'helpers/layerHelpers',
        'helpers/imageHelpers',
        'hbs!assets/html/eyewitness'],

function(L, $, map, layerStateControl, stateControl, layerHelpers, imageHelpers, template){
	        
	var map = map.map,
  $mapTab = stateControl.$mapTab,
  $mapLegend = stateControl.$mapLegend,
	layers = layerStateControl.layers,
	layerState = 'uninitialized',

	initializeLayers = function(callback){
    if (layerState === 'uninitialized'){
      //lazy-loading layers
      layerStateControl.initializeEyewitnessLayers(true, function(){
        moduleLayers = {
          'eyewitness': layers['eyewitness'],
        };
        layerHelpers.populateLayerControl(moduleLayers);
        layerState = 'initialized';
        callback();
      })
    }else{
      layerHelpers.populateLayerControl(moduleLayers);
      callback();
    }
  },

  configureLayers = function(){
    if (layerState === 'initialized'){
      layers['eyewitness'].on('click', function(e) {
        map.panTo(e.layer.getLatLng());
      });
    }
    layerState = 'configured';
  },

  buildLegendCategoryArray = function(){
    if (layerState === 'initialized' || layerState === 'configured'){
      var categories = {}, 
          eyewitnessLayers = layers['eyewitness']._layers;
      $.each(eyewitnessLayers, function(key, value){
        var category = eyewitnessLayers[key].feature.properties.category,
            color = eyewitnessLayers[key].options.fillColor;
        if ($.inArray(category, ['Flare','Odor','Leak','Dust'])!==-1){
          categories[category] = color;
        }
      })
      return categories;
    }
  },

  buildLegend = function(){
    var categories = buildLegendCategoryArray(),
        htmlString = "<h5>Categories</h5>";
    $.each(categories, function(key, value){
      htmlString += "<div class='row'><div class='col-xs-1' style='width:15px; height:12px;border:1px solid black;background-color:" + value +
        "'></div><div class='col-xs-9'>" + key + "</div>"
    });
    htmlString += "<div class='row'><div class='col-xs-1' style='width:15px; height:12px;border:1px solid black;background-color:#2E8AE6'></div>" + 
    "<div class='col-xs-9'>Other</div></div>";
    $mapLegend.append(htmlString).css('display','block');
  },

	init = function(){
    
    $mapTab.html(template({'title':'Eyewitness Reporting',
      'subtitle': 'The Louisiana Bucket Brigade iWitness Pollution Map Project'})
    );

    stateControl.defaultState({
      'lat':30.0039,
      'lng':-90.4108, 
      'zoom':12,
    });
    
    initializeLayers(function(){
      buildLegend();
    	layers['eyewitness'].addTo(map);
    	configureLayers();
    });

  }

  return {init:init}
})