//These global variables need to be sorted out
var $hurricaneVideo = $("#hurricane-video"),
    hurricaneVideoStatus = 'paused',
    hurricaneVolumeBar = document.getElementById("hurricane-volume-bar"),
    $playButton = $('#hurricane-play'),
    $hurricaneContextVisual = $('#hurricane-context-visual'),
    $hurricaneContextText = $('hurricane-context-text'),
    $mainMapTopRight = $('#map .leaflet-top.leaflet-right');

//MAP//
var map = L.map('map', {
zoomControl: false
}).setView([30.0339, -90.4008],11);

// Disable drag and zoom handlers.
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();

// Disable tap handler, if present.
if (map.tap) map.tap.disable();

map.on('click', function(e) {
  console.log(e.latlng);
});

L.esri.basemapLayer("Imagery",{attribution:'<a class="video-link" href="./bibliography.html">Bibliography & Attribution</a> | Contact'}).addTo(map);
imageryLabels = L.esri.basemapLayer('ImageryLabels');

var miniMapLayer = new L.esri.basemapLayer("Imagery",{attribution:'Basemap: ESRI'});
var miniMap = new L.Control.MiniMap(miniMapLayer, {
  toggleDisplay: true,
  zoomLevelOffset:-4,
  position: 'bottomright'
}).addTo(map);


/********LAYERS (Find a place in the modules for these)******/

//Wrapping this in a function because its points should be removed every time the video is replayed. 


  /********************/
 /******BEGIN APP*****/
/********************/

require(['app/layers',
         'app/layerControl',
         'app/home',
         'app/labranche',
         'app/hurricane',
         'app/hurricaneVideoControl',
         'app/norco',
         'app/videoControl'],

  function(layers, layerControl, home, labranche, hurricane, hurricaneVideoControl, norco, videoControl){


     /***************************/
    /*****MODULE ACTIVATION*****/ 
   /***************************/

   hurricane.init();


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

    if ($(event.target).hasClass('hurricane')){
      activateModule({'module': 'hurricane',
        'title':'hurricane',
        'lat':30.0039, 
        'long':-90.4108,  
        'zoom':13
      });
    }else if ($(event.target).hasClass('labranche-location-button')){
      activateModule({'module': 'labranche',
        'title':'LABRANCHE WETLANDS',
        'lat':30.015,
        'long': -90.335, 
        'zoom':13
      });
      layers.labrancheDevelopments.addTo(map);
    }else if ($(event.target).hasClass('norco-location-button')){ 
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
});
