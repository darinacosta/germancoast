define(['app/layers',
        'app/layerControl'],

function(layers, layerControl){

    var $opacityBar = $('#opacity-bar'),
        $norcoLandUsePane = $('#norcoLandusePane'),
        $norcoGrowth = $('.norco-growth'),
        $norcoGrowthContext = $('#norco-growth-context'),
        landUseDisplayStatus = 'full',

    norcoGrowthClick = function norcoGrowthClick(){
      $norcoGrowthContext.css('display','none');
      $norcoGrowth.css('display','none');
      layerControl.hideAllLayers();
    },

    activateOpacityControl = $opacityBar.on("input", function() {
      opacityValue = $(this).val();
      layers.plantationsLayer.setOpacity(opacityValue);
    }),

    activateLandUsePaneEvents = $norcoLandUsePane.on("click",  "a[href^='#']", function(event){
      if ($(event.target).hasClass('plantation')){
        norcoGrowthClick();
        layers.plantationsLayer.addTo(map);
        $("#norco-growth-plantation").css('display','block');
        map.setView(new L.LatLng(30.0039, -90.4108), 12);
      }else if ($(event.target).hasClass('levee-domination')){
        norcoGrowthClick();
        layers.norcoLandUse.addTo(map);
        $("#norco-growth-domination").css('display','block');
        map.setView(new L.LatLng(30.001, -90.405), 14);
      }else if ($(event.target).hasClass('ex-town')){
        norcoGrowthClick();
        map.setView(new L.LatLng(30.004, -90.418), 16);
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
      activateOpacityControl;
      activateLandUsePaneEvents
    }

  return {init: init};
  }//End Norco

)