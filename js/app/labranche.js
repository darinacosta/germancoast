define(['app/layers',
        'app/layerControl',
        'app/screenControl'],

  function(layers,layerControl,screenControl){

    var labrancheDevelopments = layers.labrancheDevelopments,
        developmentsArray = {},
        labrancheIndustrialPoint = new L.latLng(30.03759433988124,-90.37714004516602),

    buildDevelopmentsArray = function() {
      $.each(labrancheDevelopments._layers, function(key, value){
        developmentsArray[value.feature.properties.NAME] = value;
      });
    }, 

    activateGeometryLinks = function(){
      buildDevelopmentsArray();
      $('#labranchePane').on("click", "a[href^='#']", function(event){
        if ($(event.target).hasClass('labranche-industrial-park')){
          developmentsArray['LaBranche Industrial Park'].fireEvent('click',{latlng: labrancheIndustrialPoint});;
        }
      });
    },
    
    init =  function(){
      console.log('labranche init');
      screenControl.readyScreen({
        'lat':30.015,
        'lng': -90.335, 
        'zoom':13
      });

      layers.labrancheDevelopments.addTo(map);

      activateGeometryLinks();

      layerControl.selectPolyOnClick({
        targetLayer: labrancheDevelopments, 
        selectedColor: 'rgb(200,200,0)', 
        selectedFill: 'rgb(130,150,0)', 
        originalColor: '#960000', 
        originalFill: '#642800'
      });

    };

  return {init: init};
    
});