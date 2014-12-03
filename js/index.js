//Globals
var $mainMapTopRight = $('#map .leaflet-top.leaflet-right'),

    //MAP//
    map = L.map('map', {
    zoomControl: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false
    }).setView([30.0339, -90.4008],11),

    imageryLabels = L.esri.basemapLayer('ImageryLabels'),

    miniMapLayer = new L.esri.basemapLayer("Imagery",{attribution:'Basemap: ESRI'}),
    miniMap = new L.Control.MiniMap(miniMapLayer, {
      toggleDisplay: true,
      zoomLevelOffset:-4,
      position: 'bottomright'
    }).addTo(map);

//MAP CONFIG//

// Disable tap handler, if present.
if (map.tap) map.tap.disable();

map.on('click', function(e) {
  console.log(e.latlng);
});

L.esri.basemapLayer("Imagery",{attribution:'<a class="video-link" href="./bibliography.html">Bibliography & Attribution</a> | Contact'}).addTo(map);


  /********************/
 /******BEGIN APP*****/
/********************/

require(['app/layers',
         'app/layerControl',
         'app/home',
         'app/labranche',
         'app/hurricane',
         'app/norco',
         'app/videoControl',
         'app/hurricaneVideoControl'],

  function(layers, layerControl, home, labranche, hurricane, norco, videoControl){


       /***************************/
      /*****MODULE ACTIVATION*****/ 
     /***************************/

    function activateModule(args){
      layerControl.hideAllLayers();
      videoControl.videoEventPopup._close();
      $mainMapTopRight.html('');
      window.scrollTo(0, 0);
      map.setView(new L.LatLng(args['lat'],args['long']), args['zoom']);
      $('#'+args['module']+'-location-button').css('background-color','rgb(72, 131, 117)');
    };

    //HEADER MENU
    $( ".main-menu" ).on( "click", "a[href^='#']", function(event) {
      
      imageryLabels.addTo(map);

      if ($(event.target).hasClass('hurricane-location-button')){
        console.log('hur init');
        hurricane.init();
        activateModule({'module': 'hurricane',
          'title':'hurricane',
          'lat':30.0039, 
          'long':-90.4108,  
          'zoom':13
        });
      }else if ($(event.target).hasClass('labranche-location-button')){
        labranche.init();
        activateModule({'module': 'labranche',
          'title':'LABRANCHE WETLANDS',
          'lat':30.015,
          'long': -90.335, 
          'zoom':13
        });
        layers.labrancheDevelopments.addTo(map);
      }else if ($(event.target).hasClass('norco-location-button')){ 
        norco.init();
        activateModule({'module':'norco',
          'title':'NORCO INDUSTRIAL GROWTH',
          'lat':30.0039, 
          'long':-90.4108, 
          'zoom':12
        });
      }else if ($(event.target).hasClass('home-location-button')){ 
        map.removeLayer(imageryLabels);
        activateModule({'module':'home',
          'title':'LOUISIANA\'S GERMAN COAST',
          'lat': 30.0339, 
          'long':-90.4008, 
          'zoom':11
        });
      }
    });
  }
);
