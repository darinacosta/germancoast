define(['jquery',
        'map',
        'layers/layers',
        'helpers/layerHelpers',
        'helpers/screenHelpers',
        'helpers/videoHelpers'],

  function($, map, layers, layerHelpers, screenHelpers, videoHelpers){

    var returnVideoString = videoHelpers.returnVideoString,
        videoEventPopup = videoHelpers.videoEventPopup,
        $home = $( "#home" ),

    activateGeometryLinks = (function(){

      $home.click( function(event) {
        if (event.target.id === 'radial-geofeature-event'){
          map.setView([30.269, -90.377], 15);
        }else if (event.target.id === 'erosion-geofeature-event'){
          map.setView([30.046, -90.330], 14);
        } else if (event.target.id === 'ej-geofeature-event'){
          map.setView([30.004, -90.414], 14);
          videoEventPopup.setLatLng([30.001, -90.409]);
          videoEventPopup.openOn(map);
          videoEventPopup.setContent(returnVideoString('norco_flaring_v1'));
        }else if (event.target.id === 'suburb-geofeature-event'){
          map.setView([30.088, -90.446], 14);
        }else if (event.target.id === 'parishline-geofeature-event'){
          map.setView([30.032, -90.279], 14); 
        }
      })
    })(),

    init = function(){
      map.removeLayer(layers.imageryLabels);

      screenHelpers.readyScreen({
        'lat':30.0339,
        'lng':-90.4008, 
        'zoom':11
      });
      
    }

    return {init: init};
  }
);