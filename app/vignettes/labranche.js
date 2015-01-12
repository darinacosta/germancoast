define(['jquery',
        'map',
        'controllers/layerStateControl',
        'controllers/stateControl',
        'helpers/layerHelpers',
        'text!assets/html/speculation.html'],

  function($, map, layerStateControl, stateControl, layerHelpers, speculationHtml){

    var map = map.map,
        $mapTab = stateControl.$mapTab,
        labrancheDevelopments = layerStateControl.labrancheDevelopments,
        appLayers = germancoastapp.layers,
        labrancheIndustrialPoint = new L.latLng(30.03759433988124,-90.37714004516602),
        moduleLayers, layerState,

    activateLayers = function(callback){
      if (layerState !== 'activated'){
        //lazy-loading layers
        layerStateControl.activateSpeculationLayers(true, function(){
          moduleLayers = {
            'Levee': appLayers['airlineLevee'],
            'Speculative Developments': appLayers['labrancheDevelopments']
          };
          layerHelpers.populateLayerControl(moduleLayers);
          layerState = 'activated';
          callback();
        });
      }else{
        layerHelpers.populateLayerControl(moduleLayers);
        callback();
      }
    },

    configureLayers = function(){

      if (appLayers['labrancheDevelopments'] !== undefined){
        console.log('begin labranche developments');

        var labrancheDevelopments = appLayers['labrancheDevelopments'],
        levee = appLayers['airlineLevee'],
        developmentsArray = {},

        buildDevelopmentsArray = (function() {
          $.each(labrancheDevelopments._layers, function(key, value){
            developmentsArray[value.feature.properties.NAME] = value;
          });
        })(), 

        activateGeometryLinks = (function(){
          $('.map-tab-content').on("click", "#speculation a", function(event){
            if ($(event.target).hasClass('labranche-industrial-park')){
              labrancheDevelopments.addTo(map);
              developmentsArray['LaBranche Industrial Park'].fireEvent('click',{latlng: labrancheIndustrialPoint});;
            }else if ($(event.target).hasClass('airline-levee')){
              map.setView(new L.LatLng(29.98512, -90.3433), 13);
              levee.addTo(map);
            }
          });
        })();

        layerHelpers.selectPolyOnClick({
          targetLayer: labrancheDevelopments, 
          selectedColor: 'rgb(200,200,0)', 
          selectedFill: 'rgb(130,150,0)', 
          originalColor: '#960000', 
          originalFill: '#642800',
          zoom: 14
        });

        labrancheDevelopments.addTo(map);
      };
    },
      
    init =  function(){

      stateControl.defaultState({
        'lat':30.015,
        'lng': -90.335, 
        'zoom':13
      });

      activateLayers(function(){
        configureLayers();
      });
      $mapTab.html(speculationHtml);

    };

  return {init: init};
    
});