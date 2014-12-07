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
    
    home.init();

    $( ".main-menu" ).on( "click", "a[href^='#']", function(event) {
      
      imageryLabels.addTo(map);

      if ($(event.target).hasClass('hurricane-location-button')){
        hurricane.init();
      }else if ($(event.target).hasClass('labranche-location-button')){
        labranche.init();
      }else if ($(event.target).hasClass('norco-location-button')){ 
        norco.init();
      }else if ($(event.target).hasClass('home-location-button')){ 
        home.init();
      }
    });
  }
);
