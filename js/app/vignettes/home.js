define(['app/layers',
        'app/helpers/layerHelpers',
        'app/helpers/screenHelpers',
        'app/helpers/videoHelpers'],

  function(layers, layerHelpers, screenHelpers, videoHelpers){

    var returnVideoString = videoHelpers.returnVideoString,
        videoEventPopup = videoHelpers.videoEventPopup,

    activateGeometryLinks = function(){

      $( "#home" ).on( "click", "a[class='geometry-link']", function( event ) {
        switch(event.target.id){
          case 'radial-geofeature-event':
            map.setView([30.269, -90.377], 15);
            break;
          case 'erosion-geofeature-event':
            map.setView([30.046, -90.330], 14);
            break;
          case 'ej-geofeature-event':
            map.setView([30.004, -90.414], 14);
            videoEventPopup.setLatLng([30.001, -90.409]);
            videoEventPopup.openOn(map);
            videoEventPopup.setContent(returnVideoString('norco_flaring_v1'));
            break;
          case 'suburb-geofeature-event':
            map.setView([30.088, -90.446], 14);
            break;
          case 'parishline-geofeature-event':
            map.setView([30.032, -90.279], 14);
            break; 
          }
        }
      )
    },

    init = function(){
      map.removeLayer(imageryLabels);

      screenHelpers.readyScreen({
        'lat':30.0339,
        'lng':-90.4008, 
        'zoom':11
      });

      activateGeometryLinks();
    }

    return {init: init};
  }
);