define(['app/layers',
        'app/layerControl'],

  function(layers,layerControl){

    var labrancheDevelopments = layers.labrancheDevelopments,
    
    executeDevelopmentEvent = function(selector, id, context){
      $('.geometry-link').css('text-decoration','none');
      $(selector).css('text-decoration','underline');
      $('#labranche-context').html(context);
    },

    clickPoly = function() {
      $.each(labrancheDevelopments._layers, function(key, value){
        if (value.feature.properties.NAME === "LaBranche Industrial Park") {
          value.fireEvent('click',{latlng:[30.03759433988124,-90.37714004516602]});
          map.setView(new L.LatLng(30.03759433988124,-90.37714004516602),14);
        }
      });
    },

    activateGeometryLinks = $('#labranchePane').on("click", "a[href^='#']", function(event){
      if ($(event.target).hasClass('labranche-industrial-park')){
        clickPoly();
        console.log('Labranche Industrial Park');
      }
    }),
    
    init =  function(){
      activateGeometryLinks;
      layerControl.selectPolyOnClick(labrancheDevelopments, 'rgb(200,200,0)', 'rgb(130,150,0)');
    };

  return {init: init};
    
});