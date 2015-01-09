define(['jquery',
        'map',
        'controllers/layerStateControl',
        'helpers/stateControl',
        'helpers/layerHelpers',
        'helpers/imageHelpers',
        'text!assets/html/domination.html',
        'magnificent'],

function($, map, layerStateControl, stateControl, layerHelpers, imageHelpers, dominationHtml){

    var layerControl = map.layerControl,
        map = map.map,
        $mapTab = stateControl.$mapTab,
        $growth = $('#growth'),
        $norcoGrowth = $('.norco-growth'),
        $norcoGrowthContext = $('#norco-growth-context'),
        landUseDisplayStatus = 'full',
        appLayers = germancoastapp.layers,
        moduleLayers,

    activateLayers = function(){
      layerStateControl.dominationLayers('activate');
    },
  

    activateLandUsePaneEvents = $('.map-tab-content').on("click",  "#growth a[href^='#']", function(event){
      if ($(event.target).hasClass('levee-domination')){
        stateControl.defaultState({
          'lat': 30.001,
          'lng': -90.405, 
          'zoom': 14
        });
        //layers.norcoLandUse.addTo(map);
        $("#norco-growth-domination").css('display','block');
      }else if ($(event.target).hasClass('ex-town')){
        stateControl.defaultState({
          'lat': 30.004,
          'lng': -90.418, 
          'zoom': 16
        });
        //layers.shellProperties.addTo(map);
      }else if ($(event.target).hasClass('land-use-switch')){
        if (landUseDisplayStatus == 'full'){
          //layers.floodLanduse.addTo(map);
          //map.removeLayer(layers.norcoLandUse);
          landUseDisplayStatus = 'partial';
        }else if (landUseDisplayStatus == 'partial'){
          //layers.norcoLandUse.addTo(map);
          //map.removeLayer(layers.floodLanduse);
          landUseDisplayStatus = 'full';
        }
      }
    }),

    init = function(){
      activateLayers();
      console.log(germancoastapp);
        
      stateControl.defaultState({
        'lat':30.0039,
        'lng':-90.4108, 
        'zoom':12
      });

      $mapTab.html(dominationHtml);

      $('.map-tab-content .image-link').magnificPopup({type:'image'});
    }

  return {init: init};
  }//End Norco

)