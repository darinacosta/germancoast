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
      //lazy-loading layers
      layerStateControl.dominationLayers('activate');
      setTimeout(function(){
        moduleLayers = {
          'Norco Land Use': appLayers['norcoLandUse'],
          'Flood Land Use': appLayers['floodLandUse'],
          'Norco Boundary': appLayers['norcoBoundary'],
          'Industrial Facilities': appLayers['industrialFacilities'],
          'Shell Properties': appLayers['shellProperties']
        };
        layerHelpers.populateLayerControl(moduleLayers);
      }, 900);
    },

    activateClickEvents = $('.map-tab-content').on("click",  "#domination a[href^='#']", function(event){
      if ($(event.target).hasClass('levee-domination')){
        stateControl.defaultState({
          'lat': 30.001,
          'lng': -90.405, 
          'zoom': 14,
          'clearLayerControl': false
        });
        appLayers['norcoLandUse'].addTo(map);
      }else if ($(event.target).hasClass('ex-town')){
        stateControl.defaultState({
          'lat': 30.004,
          'lng': -90.418, 
          'zoom': 16,
          'clearLayerControl': false
        });
        layers.shellProperties.addTo(map);
      }else if ($(event.target).hasClass('land-use-switch')){
        if (landUseDisplayStatus == 'full'){
          appLayers['floodLandUse'].addTo(map);
          map.removeLayer(appLayers['norcoLandUse']);
          landUseDisplayStatus = 'partial';
        }else if (landUseDisplayStatus == 'partial'){
          appLayers['norcoLandUse'].addTo(map);
          map.removeLayer(appLayers['floodLandUse']);
          landUseDisplayStatus = 'full';
        }
      }
    }),

    init = function(){
      activateLayers();
        
      stateControl.defaultState({
        'lat':30.0039,
        'lng':-90.4108, 
        'zoom':12,
      });

      $mapTab.html(dominationHtml);

      $('.map-tab-content .image-link').magnificPopup({type:'image'});
    }

  return {init: init};
  }//End Norco

)