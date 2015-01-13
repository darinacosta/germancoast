define(['jquery',
        'map',
        'controllers/layerStateControl',
        'helpers/layerHelpers',
        'controllers/stateControl',
        'helpers/videoHelpers',
        'text!assets/html/home.html',
        'controllers/productionLog'],

  function($, map, layerStateControl, layerHelpers, stateControl, videoHelpers, homeHtml, productionLog){

    var map = map.map,
        $mapTab = stateControl.$mapTab,
        returnVideoString = videoHelpers.returnVideoString,
        videoEventPopup = videoHelpers.videoEventPopup,

    initializeGeometryLinks = (function(){

      $('.map-tab-content').on("click", "#home", function(event) {
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

      $mapTab.html(homeHtml);
      productionLog.init();


      stateControl.defaultState({
        'lat':30.0339,
        'lng':-90.4008, 
        'zoom':11
      });
      
    }

    return {init: init};
  }
);