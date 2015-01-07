define(['leaflet',
        'esriLeaflet',
        'minimap'],

  function(L, esri, MiniMap){

    //MAP//
    var map = L.map('map', {
      zoomControl: false,
      touchZoom: false,
      scrollWheelZoom: false
    }).setView([30.0339, -90.4008],11),

    baseMap = L.esri.basemapLayer("Imagery",{attribution:'<a class="video-link" href="./bibliography.html">Bibliography & Attribution</a> | Contact'}),
    imageryLabels = new L.esri.BasemapLayer('ImageryLabels'),
    miniMapLayer = new L.esri.basemapLayer("Imagery",{attribution:'Basemap: ESRI'}),

    miniMap = new L.Control.MiniMap(miniMapLayer, {
      toggleDisplay: true,
      zoomLevelOffset:-4,
      position: 'bottomright'
    }).addTo(map),

    layerControl = L.control.layers(null, {'Labels': imageryLabels}),

    // Disable tap handler, if present.
    conigureMap = (function(){
      if (map.tap) map.tap.disable();

      map.on('click', function(e) {
        console.log(e.latlng);
      });

    })();

    baseMap.addTo(map);
    layerControl.addTo(map);
    console.log(layerControl);

    return {map: map,
            layerControl: layerControl,
            imageryLabels: imageryLabels}; 

});