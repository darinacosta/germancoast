define(['app/layers'],

  function(layers){

    function executeDevelopmentEvent(selector, id, context){
      $('.geometry-link').css('text-decoration','none');
      $(selector).css('text-decoration','underline');
      $('#labranche-context').html(context);
    };
    
    control = {
      activate: function(){

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
      }
    }

  return control;
    
});