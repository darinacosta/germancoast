define(['app/layers',
        'app/helpers/screenHelpers',
        'app/helpers/layerHelpers'],

  function(layers, screenHelpers, layerHelpers){

    var labrancheDevelopments = layers.labrancheDevelopments,
        developmentsArray = {},
        labrancheIndustrialPoint = new L.latLng(30.03759433988124,-90.37714004516602),

    buildDevelopmentsArray = function() {
      $.each(labrancheDevelopments._layers, function(key, value){
        developmentsArray[value.feature.properties.NAME] = value;
      });
    }, 

    activateGeometryLinks = (function(){
      buildDevelopmentsArray();
      $('#speculation').on("click", "a[href^='#']", function(event){
        if ($(event.target).hasClass('labranche-industrial-park')){
          developmentsArray['LaBranche Industrial Park'].fireEvent('click',{latlng: labrancheIndustrialPoint});;
        }
      });
    })(),
    
    init =  function(){
      screenHelpers.readyScreen({
        'lat':30.015,
        'lng': -90.335, 
        'zoom':13
      });

      //Reset potential style changes
      labrancheDevelopments.setStyle({
        color: '#960000',
        fillColor: '#642800'
      });
      
      labrancheDevelopments.addTo(map);

      layerHelpers.selectPolyOnClick({
        targetLayer: labrancheDevelopments, 
        selectedColor: 'rgb(200,200,0)', 
        selectedFill: 'rgb(130,150,0)', 
        originalColor: '#960000', 
        originalFill: '#642800'
      });

    };

  return {init: init};
    
});