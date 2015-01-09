define(['jquery',
        'map',
        'layers/layers',
        'helpers/stateControl',
        'helpers/layerHelpers',
        'helpers/imageHelpers',
        'text!assets/html/domination.html',
        'magnificent'],

function($, map, layers, stateControl, layerHelpers, imageHelpers, dominationHtml){

    var layerControl = map.layerControl,
        map = map.map,
        $mapTab = stateControl.$mapTab,

    moduleLayers = {
      "Norco Boundary": layers.norcoBoundary,
      "Norco Land Use": layers.norcoLandUse,
      "Flood Land Use": layers.floodLanduse,
      "Shell-owned Properties": layers.shellProperties,
      "Industrial Facilities": layers.industrialFacilities
    },

    $growth = $('#growth'),
    $norcoGrowth = $('.norco-growth'),
    $norcoGrowthContext = $('#norco-growth-context'),
    landUseDisplayStatus = 'full',

    activateLandUsePaneEvents = $('.map-tab-content').on("click",  "#growth a[href^='#']", function(event){
      if ($(event.target).hasClass('levee-domination')){
        stateControl.defaultState({
          'lat': 30.001,
          'lng': -90.405, 
          'zoom': 14
        });
        layers.norcoLandUse.addTo(map);
        $("#norco-growth-domination").css('display','block');
      }else if ($(event.target).hasClass('ex-town')){
        stateControl.defaultState({
          'lat': 30.004,
          'lng': -90.418, 
          'zoom': 16
        });
        layers.shellProperties.addTo(map);
      }else if ($(event.target).hasClass('land-use-switch')){
        if (landUseDisplayStatus == 'full'){
          layers.floodLanduse.addTo(map);
          map.removeLayer(layers.norcoLandUse);
          landUseDisplayStatus = 'partial';
        }else if (landUseDisplayStatus == 'partial'){
          layers.norcoLandUse.addTo(map);
          map.removeLayer(layers.floodLanduse);
          landUseDisplayStatus = 'full';
        }
      }
    }),

    init = function(){
      stateControl.defaultState({
        'lat':30.0039,
        'lng':-90.4108, 
        'zoom':12,
        'layers': moduleLayers
      });

      $mapTab.html(dominationHtml);

      $('.map-tab-content .image-link').magnificPopup({type:'image'});
    }

  return {init: init};
  }//End Norco

)