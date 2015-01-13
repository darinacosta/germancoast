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
        layers = layerStateControl.layers,
        labrancheIndustrialPoint = new L.latLng(30.03759433988124,-90.37714004516602),
        moduleLayers, layerState,

    initializeLayers = function(callback){
      if (layerState !== 'initialized'){
        //lazy-loading layers
        layerStateControl.initializeSpeculationLayers(true, function(){
          moduleLayers = {
            'Levee': layers['airlineLevee'],
            'Speculative Developments': layers['labrancheDevelopments']
          };
          layerHelpers.populateLayerControl(moduleLayers);
          layerState = 'initialized';
          callback();
        });
      }else{
        layerHelpers.populateLayerControl(moduleLayers);
        callback();
      }
    },

    configureLayers = function(){

      if (layers['labrancheDevelopments'] !== undefined){
        console.log('begin labranche developments');

        var labrancheDevelopments = layers['labrancheDevelopments'],
        levee = layers['airlineLevee'],
        developmentsArray = {},

        buildDevelopmentsArray = (function() {
          $.each(labrancheDevelopments._layers, function(key, value){
            developmentsArray[value.feature.properties.NAME] = value;
          });
        })(), 

        initializeGeometryLinks = (function(){
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

      initializeLayers(function(){
        configureLayers();
      });
      $mapTab.html(speculationHtml);

    };

  return {init: init};
    
});