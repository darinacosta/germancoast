define(['jquery',
        'map',
        'controllers/layerStateControl',
        'controllers/stateControl',
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
        moduleLayers, layerState,

    activateLayers = function(callback){
      if (layerState !== 'activated'){
        //lazy-loading layers
        layerStateControl.activateDevelopmentLayers(true, function(){
          console.log('actvivifivd')
          moduleLayers = {
            'Norco Land Use': appLayers['norcoLandUse'],
            'Flood Land Use': appLayers['floodLandUse'],
            'Norco Boundary': appLayers['norcoBoundary'],
            'Industrial Facilities': appLayers['industrialFacilities'],
            'Shell Properties': appLayers['shellProperties']
          };
          layerHelpers.populateLayerControl(moduleLayers);
          layerState = 'activated';
          callback();
        })
      }else{
        layerHelpers.populateLayerControl(moduleLayers);
        callback();
      }
    },

    configureLayers = function(){
      if (appLayers['industrialFacilities'] !== undefined){

        layerHelpers.selectPolyOnClick({
          targetLayer: appLayers['industrialFacilities'], 
          selectedColor: 'rgb(200,200,0)', 
          selectedFill: 'rgb(130,150,0)', 
          originalColor: '#960000', 
          originalFill: '#642800'
        });

      }
    },

    activateClickEvents = $('.map-tab-content').on("click",  "#domination a", function(event){
      if ($(event.target).hasClass('levee-domination')){
        stateControl.zoomAndHideLayers({
          'lat': 30.001,
          'lng': -90.405, 
          'zoom': 14
        });
        appLayers['norcoLandUse'].addTo(map);
      }else if ($(event.target).hasClass('goodhope')){
        stateControl.zoomAndHideLayers({
          'lat': 29.992,
          'lng': -90.4001, 
          'zoom': 16
        });
      }else if ($(event.target).hasClass('ex-town')){
        stateControl.zoomAndHideLayers({
          'lat': 30.004,
          'lng': -90.418, 
          'zoom': 16
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
        
      stateControl.defaultState({
        'lat':30.0039,
        'lng':-90.4108, 
        'zoom':12,
      });

      activateLayers(function(){
        configureLayers();
        appLayers['industrialFacilities'].addTo(map);
      });
      
      $mapTab.html(dominationHtml);

      $('.map-tab-content .image-link').magnificPopup({type:'image'});
    }

  return {init: init};
  }//End Norco

)