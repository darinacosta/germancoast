define(['jquery',
        'map',
        'layers/layers',
        'helpers/stateControl',
        'helpers/layerHelpers',
        'text!assets/html/speculation.html'],

  function($, map, layers, stateControl, layerHelpers, speculationHtml){

    var map = map.map,
        $mapTab = stateControl.$mapTab,
        labrancheDevelopments = layers.labrancheDevelopments,
        developmentsArray = {},
        labrancheIndustrialPoint = new L.latLng(30.03759433988124,-90.37714004516602),
        moduleLayers = {'Speculative Developments': labrancheDevelopments},

    buildDevelopmentsArray = function() {
      $.each(labrancheDevelopments._layers, function(key, value){
        developmentsArray[value.feature.properties.NAME] = value;
      });
    }, 

    activateGeometryLinks = (function(){
      buildDevelopmentsArray();
      $('.map-tab-content').on("click", "#speculation a[href^='#']", function(event){
        if ($(event.target).hasClass('labranche-industrial-park')){
          developmentsArray['LaBranche Industrial Park'].fireEvent('click',{latlng: labrancheIndustrialPoint});;
        }
      });
    })(),

    configureLabrancheDevelopments = function(){
      //Reset potential style changes
      labrancheDevelopments.setStyle({
        color: '#960000',
        fillColor: '#642800'
      });

      layerHelpers.selectPolyOnClick({
        targetLayer: labrancheDevelopments, 
        selectedColor: 'rgb(200,200,0)', 
        selectedFill: 'rgb(130,150,0)', 
        originalColor: '#960000', 
        originalFill: '#642800'
      });

      labrancheDevelopments.addTo(map);
    };
    
    init =  function(){
      $mapTab.html(speculationHtml);

      stateControl.defaultState({
        'lat':30.015,
        'lng': -90.335, 
        'zoom':13
      });
      
      configureLabrancheDevelopments();
    };

  return {init: init};
    
});