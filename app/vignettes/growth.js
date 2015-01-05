define(['jquery',
        'map',
        'layers/layers',
        'helpers/stateControl',
        'helpers/layerHelpers',
        'helpers/imageHelpers',
        'text!assets/html/growth.html'],

function($, map, layers, stateControl, layerHelpers, imageHelpers, growthHtml){

    var $mapTab = stateControl.$mapTab,

    baseLayers = {
        "Flood Land Use": layers.floodLanduse,
        "Norco Land Use": layers.norcoLandUse
      };

    L.control.layers(baseLayers).addTo(map);


    var $opacityBar = $('#opacity-bar'),
        $growth = $('#growth'),
        $norcoGrowth = $('.norco-growth'),
        $norcoGrowthContext = $('#norco-growth-context'),
        landUseDisplayStatus = 'full',

    norcoGrowthClick = function norcoGrowthClick(){
      $norcoGrowthContext.css('display','none');
      $norcoGrowth.css('display','none');
      layerHelpers.hideAllLayers();
    },

    activateOpacityControl = $opacityBar.on("input", function() {
      opacityValue = $(this).val();
      layers.plantationsLayer.setOpacity(opacityValue);
    }),

    activateLandUsePaneEvents = $('.map-tab-content').on("click",  "#growth a[href^='#']", function(event){
      if ($(event.target).hasClass('plantation')){
        stateControl.readyScreen({
          'lat':30.0039,
          'lng': -90.4108, 
          'zoom':12
        });
        map.doubleClickZoom.disable();
        norcoGrowthClick();
        layers.plantationsLayer.addTo(map);
        $("#norco-growth-plantation").css('display','block');
        map.setView(new L.LatLng(30.0039, -90.4108), 12);
      }else if ($(event.target).hasClass('levee-domination')){
        stateControl.readyScreen({
          'lat': 30.001,
          'lng': -90.405, 
          'zoom': 14
        });
        norcoGrowthClick();
        layers.norcoLandUse.addTo(map);
        $("#norco-growth-domination").css('display','block');
      }else if ($(event.target).hasClass('ex-town')){
        stateControl.readyScreen({
          'lat': 30.004,
          'lng': -90.418, 
          'zoom': 16
        });
        norcoGrowthClick();
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
      
      $mapTab.html(growthHtml);

      $norcoGrowth.css('display','none');
      $norcoGrowthContext.css('display','block');

      stateControl.readyScreen({
        'lat':30.0039,
        'lng':-90.4108, 
        'zoom':12
      });

      activateOpacityControl;
      activateLandUsePaneEvents;
    }

  return {init: init};
  }//End Norco

)