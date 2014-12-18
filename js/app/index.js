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

require(['app/vignettes/home',
         'app/controller',
         'app/helpers/persistenceControl',
         'app/helpers/screenHelpers',
         'app/helpers/imageHelpers',
         'app/helpers/hurricaneVideoControl'],

  function(home, controller, persistenceControl, screenHelpers, imageHelpers, hurricaneVideoControl){
    
    if (window.location.hash == ''){ home.init(); };
    
    //Preload any large images
    $(window).load( function (){
      $('#load-screen').fadeOut( "slow", function(){
        imageHelpers.preload(['http://verylongroad.com/gis/services/plantation_test_v1.jpg']);
      });
    });
  
    controller.init();
    persistenceControl.init();
  }
);
