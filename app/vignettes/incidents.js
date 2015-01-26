define(['leaflet',
	      'jquery',
        'map',
        'controllers/layerStateControl',
        'controllers/stateControl',
        'helpers/layerHelpers',
        'helpers/imageHelpers',
        'text!assets/html/incidents.html'],

function(L, $, map, layerStateControl, stateControl, layerHelpers, imageHelpers, incidentsHtml){
	        
	var map = map.map,
  $mapTab = stateControl.$mapTab,
  $mapLegend = stateControl.$mapLegend,
	layers = layerStateControl.layers,
	layerState,

	initializeLayers = function(callback){
    if (layerState !== 'initialized'){
      //lazy-loading layers
      layerStateControl.initializeIncidentLayers(true, function(){
        moduleLayers = {
          'Incidents': layers['incidents'],
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

  buildLegendCategoryArray = function(){
    if (layerState === 'initialized'){
      var categories = {}, 
          incidentLayers = layers['incidents']._layers;
      $.each(incidentLayers, function(key, value){
        var category = incidentLayers[key].feature.properties.category,
            color = incidentLayers[key].options.fillColor;
        if (category !== categories){
         categories[category] = color;
        }
      })
      return categories;
    }
  },

  buildLegend = function(){
    var categories = buildLegendCategoryArray(),
        htmlString = "<h5>Incident Categories</h5>";
    $.each(categories, function(key, value){
      htmlString += "<div class='row'><div class='col-xs-1' style='width:15px; height:12px;border:1px solid black;background-color:" + value +
        "'></div><div class='col-xs-9'>" + key + "</div>"
    });
    htmlString += "</div>";
    console.log(htmlString);
    $mapLegend.append(htmlString).css('display','block');
  },

	init = function(){
    
    $mapTab.html(incidentsHtml);

    stateControl.defaultState({
      'lat':30.0039,
      'lng':-90.4108, 
      'zoom':12,
    });
    
    initializeLayers(function(){
      buildLegend();
    	layers['incidents'].addTo(map);
    	layers['incidents'].on('click', function(e) {
        map.panTo(e.layer.getLatLng());
      });
    });

  }

  return {init:init}
})