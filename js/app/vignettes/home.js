define(['app/layers',
        'app/helpers/layerControl'],

  function(layers,layerControl){

  var activateGeometryLinks = function(){

    $( "#homePane" ).on( "click", "a[class='geometry-link']", function( event ) {
      switch(event.target.id){
        case 'radial-geofeature-event':
          map.setView(new L.LatLng(30.269, -90.377), 15);
          break;
        case 'erosion-geofeature-event':
          map.setView(new L.LatLng(30.046, -90.330), 14);
          break;
        case 'ej-geofeature-event':
          map.setView(new L.LatLng(30.004, -90.414), 14);
          break;
        case 'suburb-geofeature-event':
          map.setView(new L.LatLng(30.088, -90.446), 14);
          break;
        case 'parishline-geofeature-event':
          map.setView(new L.LatLng(30.032, -90.279), 14);
          break; 
        }
      }
    )
  },

  init = function(){
    map.removeLayer(imageryLabels);
    map.setView([30.0339, -90.4008], 11);
    activateGeometryLinks();
  }

  return {init: init};

});