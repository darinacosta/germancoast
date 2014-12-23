define(['leaflet',
        'esriLeaflet',
        'minimap'],

  function(L, esri, MiniMap){

    //Globals
    var $mainMapTopRight = null;
    //$('#map .leaflet-top.leaflet-right');

    //MAP//
    var map = L.map('map', {
      zoomControl: false,
      touchZoom: false,
      doubleClickZoom: false,
      scrollWheelZoom: false
    }).setView([30.0339, -90.4008],11),

    miniMapLayer = new L.esri.basemapLayer("Imagery",{attribution:'Basemap: ESRI'}),
    miniMap = new L.Control.MiniMap(miniMapLayer, {
      toggleDisplay: true,
      zoomLevelOffset:-4,
      position: 'bottomright'
    }).addTo(map);

    //MAP CONFIG//

    // Disable tap handler, if present.
    
    conigureMap = (function(){
      if (map.tap) map.tap.disable();

      map.on('click', function(e) {
        console.log(e.latlng);
      });
    })();
    
    L.esri.basemapLayer("Imagery",{attribution:'<a class="video-link" href="./bibliography.html">Bibliography & Attribution</a> | Contact'}).addTo(map);

    return map; 

});