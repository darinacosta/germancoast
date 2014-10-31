
  //Controls
  function adjustRowHeight(extraHeight){
    var topDivHeight = $("#map-header").height() + $(".map-container").height()+extraHeight;
    var totalHeight = $(document).height();
    $('.bottom-row').height(totalHeight - topDivHeight);
  };

  $( window ).resize(function() {
    adjustRowHeight(43);
  });
  
  //button control
  var activebutton = 'norco';
  var labrancheActivated = 'no';

  var trepagnierContext = 'The Walker Land Company began selling parcels in this development in the early 1970s. Soon the company was under investigation by the U.S. Secretary of Housing and Urban Development (HUD) for failing to address certain "particulars" of the development before selling the properties, such as:<br><br><ul><li>Failing to disclose in the property report to HUD that a "marina, boat-town, golf course, tennis courts, motel, and regional shopping center" would be constructed, as promised in advertising.</li><li>Failing to address who would be responsible for draining lots below sea level (ie, would it be the responsibility of the purchaser to foot the bill?).</li><li>Failing to address how access to all lots would be achieved since there were\'t any streets or roads.</li></ul>'
    
    require(["esri/map", 
      "esri/geometry/webMercatorUtils",
      "dojo/dom",
      "application/bootstrapmap", 
      "esri/layers/KMLLayer",
      "esri/geometry/Extent",
      "esri/layers/GraphicsLayer",
      "esri/graphic", 
      "esri/tasks/GeometryService",
      "esri/tasks/query",
      "esri/tasks/QueryTask",
      "esri/dijit/Popup",
      "esri/dijit/PopupTemplate",
      "esri/dijit/InfoWindow",
      "esri/InfoTemplate",
      "esri/symbols/SimpleFillSymbol", 
      "esri/symbols/SimpleLineSymbol", 
      "esri/Color",
      "dojo/_base/array",
      "esri/layers/FeatureLayer",
      "dojo/domReady!"], 
      function(Map,
        webMercatorUtils,
        dom, 
        BootstrapMap, 
        KMLLayer,
        Extent,
        GraphicsLayer,
        Graphic,
        GeometryService,
        Query,
        QueryTask,
        Popup,
        PopupTemplate,
        InfoWindow,
        InfoTemplate,
        SimpleFillSymbol,
        SimpleLineSymbol,
        Color,
        arrayUtils,
        FeatureLayer
        ) {

        //Layers 
        var developmentsUrl = 'http://verylongroad.com/gis/services/labranche_service_v7.kmz'
        var developments = new KMLLayer(developmentsUrl, {"opacity": 0.7});
        
        var landuseUrl = 'http://verylongroad.com/gis/services/norco_land_uses_complete_v1.kmz'
        var landuse = new KMLLayer(landuseUrl, {"opacity": 0.5})

        var floodLanduseUrl = 'http://verylongroad.com/gis/services/norco_land_uses_500yrfloodplain_DISSOLVE_v1.kmz'
        var floodLanduse = new KMLLayer(floodLanduseUrl, {"opacity": 0.5})
        
        var shellPropertiesUrl = 'http://verylongroad.com/gis/services/shell_properties_v1.kmz'
        var shellProperties = new KMLLayer(shellPropertiesUrl, {"opacity": 0.7})
        

        layerJson = [
                  {'layersType': 'norco',
                    'layers': [floodLanduse, landuse, shellProperties]},
                  {'layersType':'labranche',
                    'layers': [developments]}]

        //Colors
        var selected = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, 
              new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
              new Color([200,200,0]), 2), new Color([130,150,0,0.5])
            );
        var unselected = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, 
              new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
              new Color([150,0,0]), 1), new Color([100,40,0,0.7])
            );


        var map = BootstrapMap.create("mapDiv",{
          basemap: "hybrid",
          center: [-90.4008, 30.0339], // longitude, latitude
          zoom: 12,
          logo:false,
          showInfoWindowOnClick:false  
        });

        map.on("load", function() {
          //after map loads, connect to listen to mouse move & drag events
          map.on("click", showCoordinates);
        });

        function showCoordinates(evt) {
          //the map is in web mercator but display coordinates in geographic (lat, long)
          var mp = webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
          //display mouse coordinates
          console.log(mp.x.toFixed(3) + ", " + mp.y.toFixed(3));
        }

        //layer control
        function resetSymbols(){
          graphics.forEach(function(g){
            g.setSymbol(unselected);
          })
        };
        

        function addAllLayers(){
          for (var i=0; i<layerJson.length; i++){
            for(var l=0;l<layerJson[i].layers.length;l++){
                map.addLayer(layerJson[i].layers[l]);
              }
          }
        }

        function hideAllLayers(){
          for (var i=0; i<layerJson.length; i++){
            for(var l=0;l<layerJson[i].layers.length;l++){
               layerJson[i].layers[l].hide();
              }
          }
        }
       

        function hideExtraLayers(type){
          for (var i=0; i<layerJson.length; i++){
            if(layerJson[i].layersType != type){
              for(var l=0;l<layerJson[i].layers.length;l++){
                layerJson[i].layers[l].hide();
              }
            }
          }
        }

        function showRelevantLayers(type){
          for (var i=0; i<layerJson.length; i++){
            if(layerJson[i].layersType == type){
              for(var l=0;l<layerJson[i].layers.length;l++){
                layerJson[i].layers[l].show();
              }
            }
          }
        }
        
        //Load Layers
        addAllLayers();
        hideAllLayers();


        /*///////////////////////////////////////*/
       /*//////////////////HOME/////////////////*/
      /*///////////////////////////////////////*/
      

      $('#radial-geofeature-event').on("click", function(){
        map.centerAndZoom([-90.377, 30.269], 14);
      });

      $('#radial-geofeature-event').on("click", function(){
        map.centerAndZoom([-90.377, 30.269], 14);
      });

      $('#erosion-geofeature-event').on("click", function(){
        map.centerAndZoom([-90.330, 30.046], 14);
      }); 

      $('#ej-geofeature-event').on("click", function(){
        map.centerAndZoom([-90.414, 30.004 ], 14);
      }); 

      $('#suburb-geofeature-event').on("click", function(){
        map.centerAndZoom([-90.446, 30.088],14);
      });
      
      $("#parishline-geofeature-event").on("click", function(){
        map.centerAndZoom([-90.279, 30.032], 14);
      }); 


        /*///////////////////////////////////////*/
       /*/////////////////NORCO/////////////////*/
      /*///////////////////////////////////////*/


      function norco(){
        landuse.show();
        var landuseClicked = 0
        $('#landuse-switch-test').on("click", function(){
          if(landuseClicked == 0){
            landuse.hide();
            floodLanduse.show();
            landuseClicked = landuseClicked + 1
          }else{
            floodLanduse.hide();
            landuse.show();
            landuseClicked = landuseClicked - 1
          }
        });
        //$('#norco-top-panel').html('The Norco module is still under development. '+
         // 'Explore land speculation in the LaBranche Wetlands by clicking the "Labranche" button.');
        //<img src="i/landuse_v1.jpg" width="100%">
      }//End Norco

      /*/////////////////////////////////////*/
     /*//////////////LABRANCHE//////////////*/
    /*/////////////////////////////////////*/
     
    /*Collect Layer Information*/
    var geometries = [];
    var graphics = [];
    var extents = [];

    developments.on("load", function(evt) {

      /*Collect the line features from the KML layer*/
      kmlGeoms = evt.layer.getLayers()[0].graphics.forEach(function(g) {
        graphics.push(g);
        resetSymbols();
        extents.push({"xmin": g.geometry._extent.xmin,
                      "ymin": g.geometry._extent.ymin,
                      "xmax": g.geometry._extent.xmax,
                      "ymax": g.geometry._extent.ymax});

        });/*End KML Geoms*/

    });/*End developments.on*/

    function labranche(){

      function executeDevelopmentEvent(selector, id, context){
          resetSymbols();
          graphics[id].setSymbol(selected);
          $('.geometry-link').css('text-decoration','none');
          $(selector).css('text-decoration','underline');
          var extent = new Extent(extents[id]);
          map.setExtent(extent);
          $('#labranche-context').html(context);
      };

      function polyClick(selector, id, context){
        $(selector).on('click',function(){
          executeDevelopmentEvent(selector, id, context);
        });/*End selector click*/
      };/*End polyCLick*/
         
      polyClick('.labranche', 0, trepagnierContext);
      polyClick('.westlake', 1, 'Testing testing');
      polyClick('.cloverleaf', 2);
      polyClick('.beltway', 3);
      polyClick('.shining', 4);
      polyClick('.james', 5);
      polyClick('.monte', 6);
      polyClick('.lakeland', 7);
    }//End LaBranche

     /***************************/
    /*****MODULE ACTIVATION*****/ 
   /***************************/

  function activateModule(args){
    /*args: 'module', 'title', 'coordinates', 'zoom'*/
    window.scrollTo(0, 0);
    $('.module').css('display','none');
    $('#'+args['module']+'-module').css('display','block');
    hideAllLayers();
    map.centerAndZoom(args['coordinates'], args['zoom']);
    $('.btn').css('background-color','rgb(36, 44, 36)');
    $('#labranche-map-title').text(args['title']);
    $('#'+args['module']+'-location-button').css('background-color','rgb(72, 131, 117)');
    eval(args['module'] + '()');
  };

  //Buttons
  $('.labranche-location-button').on("click",function(){
    activateModule({'module': 'labranche',
      'title':'LABRANCHE WETLANDS',
      'coordinates':[-90.335, 30.015], 
      'zoom':12
    });
    developments.show();
  });

  $('.norco-location-button').on("click",function(){
    activateModule({'module':'norco',
      'title':'NORCO INDUSTRIAL GROWTH',
      'coordinates':[-90.4108, 30.0039], 
      'zoom':13
    });
  });

  $('.home-location-button').on("click",function(){
    activateModule({'module':'home',
      'title':'LOUISIANA\'S GERMAN COAST',
      'coordinates':[-90.4008, 30.0339], 
      'zoom':12
    });
  });

});
