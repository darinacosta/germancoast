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
        $mapLegend = stateControl.$mapLegend,
        $growth = $('#growth'),
        $norcoGrowth = $('.norco-growth'),
        $norcoGrowthContext = $('#norco-growth-context'),
        landUseDisplayStatus = 'full',
        layers = layerStateControl.layers,
        layerState = 'uninitialized',
        moduleLayers, 


    initializeLayers = function(callback){
      if (layerState === 'uninitialized'){
        //lazy-loading layers
        layerStateControl.initializeDevelopmentLayers(true, function(){
          moduleLayers = {
            'Norco Land Use': layers['norcoLandUse'],
            'Flood Land Use': layers['floodLandUse'],
            'Norco Boundary': layers['norcoBoundary'],
            'Industrial Facilities': layers['industrialFacilities'],
            'Shell Properties': layers['shellProperties']
          };
          layerHelpers.populateLayerControl(moduleLayers);
          layerState = 'initialized';
          callback();
        })
      }else{
        layerHelpers.populateLayerControl(moduleLayers);
        callback();
      }
    },

    configureLayers = function(){
      if (layerState === 'initialized'){

        layerHelpers.selectPolyOnClick({
          targetLayer: layers['industrialFacilities'], 
          selectedColor: 'rgb(200,200,0)', 
          selectedFill: 'rgb(130,150,0)', 
          originalColor: '#960000', 
          originalFill: '#642800'
        });

      }
    },

    buildLegendCategoryArray = function(){
      if (layerState === 'initialized' || layerState === 'configured'){
        var categories = {}, 
            legendLayers = layers['norcoLandUse']._layers;
        $.each(legendLayers, function(key, value){
          if (legendLayers[key].feature.properties.color_qgis2leaf !== undefined){
            var category = legendLayers[key].feature.properties.ACT_CODE,
              color = legendLayers[key].feature.properties.color_qgis2leaf;
            categories[category] = color;
          }
        })
        return categories;
      }
    },

    buildLegend = function(){
      var categories = buildLegendCategoryArray(),
          htmlString = "<h5>Land Uses</h5>";
      $.each(categories, function(key, value){
        htmlString += "<div class='row'><div class='col-xs-1' style='width:15px; height:12px;border:1px solid black;background-color:" + value +
          "'></div><div class='col-xs-9'>" + key + "</div>"
      });
      $mapLegend.append(htmlString);
    },

    controlLegend = function(){
      var landUseActive = 0;
      buildLegend();
      map.on('overlayadd', function(layer){
        if (layer.name === 'Norco Land Use' || layer.name === 'Flood Land Use'){
          landUseActive += 1;
          $mapLegend.css('display','block')
          console.log(landUseActive);
        }
      });
      map.on('overlayremove', function(layer){
        if (layer.name === 'Norco Land Use' || layer.name === 'Flood Land Use'){
          landUseActive -= 1;
          if (landUseActive === 0){
            $mapLegend.css('display','none')
          }
          console.log(landUseActive);
        }
      });
    },

    initializeClickEvents = 

      $('.map-tab-content').on("click",  "#domination a", function(event){
        if ($(event.target).hasClass('domination.levee-domination')){
          stateControl.zoomAndHideLayers({
            'lat': 30.001,
            'lng': -90.405, 
            'zoom': 14
          });
          layers['norcoLandUse'].addTo(map);
        }else if ($(event.target).hasClass('domination.industrial-facilities')){
          stateControl.zoomAndHideLayers({
            'lat':30.0039,
            'lng':-90.4108, 
            'zoom':13,
          });
          layers['industrialFacilities'].addTo(map);
        }else if ($(event.target).hasClass('domination.goodhope')){
          stateControl.zoomAndHideLayers({
            'lat': 29.992,
            'lng': -90.4001, 
            'zoom': 16
          });
        }else if ($(event.target).hasClass('domination.ex-town')){
          stateControl.zoomAndHideLayers({
            'lat': 30.004,
            'lng': -90.418, 
            'zoom': 16
          });
          layers['shellProperties'].addTo(map);
        }else if ($(event.target).hasClass('domination.norco-boundary')){
          stateControl.zoomAndHideLayers({
            'lat': 30.001,
            'lng': -90.42, 
            'zoom': 14
          });
          layers['norcoBoundary'].addTo(map);
        }else if ($(event.target).hasClass('domination.buyout')){
          stateControl.zoomAndHideLayers({
            'lat': 30.001,
            'lng': -90.42, 
            'zoom': 15
          });
          layers['shellProperties'].addTo(map);
        }else if ($(event.target).hasClass('domination.land-use-switch')){
          if (landUseDisplayStatus == 'full'){
            layers['floodLandUse'].addTo(map);
            map.removeLayer(layers['norcoLandUse']);
            landUseDisplayStatus = 'partial';
          }else if (landUseDisplayStatus == 'partial'){
            layers['norcoLandUse'].addTo(map);
            map.removeLayer(layers['floodLandUse']);
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

      initializeLayers(function(){
        controlLegend();
        configureLayers();
      });
      
      $mapTab.html(dominationHtml);

      $('.map-tab-content .image-link').magnificPopup({type:'image'});
    }

  return {init: init};
  }//End Norco

)