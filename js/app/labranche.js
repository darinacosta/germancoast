define(['app/layers'],

  function(layers){

    var executeDevelopmentEvent = function(selector, id, context){
      $('.geometry-link').css('text-decoration','none');
      $(selector).css('text-decoration','underline');
      $('#labranche-context').html(context);
    },

    clickButton = function() {
      $.each(layers.labrancheDevelopments._layers, function(key, value){
        if (value.feature.properties.NAME === "LaBranche Industrial Park") {
          value.fire('click',{latlng:[30.0405664305846,-90.3017807006836]});
          }
        });
      },

    activateGeometryLinks = $('#labranchePane').on("click", "a[href^='#']", function(event){
      if ($(event.target).hasClass('labranche-industrial-park')){
        clickButton();
        console.log('Labranche Industrial Park');
      }
    }),
    
    init =  function(){

      console.log(layers.labrancheDevelopments);
      
      activateGeometryLinks;

      layers.labrancheDevelopments.on("click", function(e){
        layers.labrancheDevelopments.setStyle({color: "#960000",
            fillColor: "#642800",
            fillOpacity: 0.4,
            weight: 1})
        e.layer.setStyle({
          'fillColor':'rgb(130,150,0)',
          'color':'rgb(200,200,0)'
        });
        map.setView(new L.LatLng(e.latlng['lat'],e.latlng['lng']),14);
      })
    };

  return {init: init};
    
});