var require = {
    baseUrl: '.',
    shim : {
        "bootstrap"  : { "deps" : ['jquery'] },
        "magnificent": { "deps" : ['jquery'] },
        "esriLeaflet": { "deps" : ['leaflet'] },
        "omnivore"   : { "deps" : ['leaflet'] }    },
    paths: {
        vignettes: './vignettes',
        helpers: './helpers',
        layers: './assets/layers',
        //Cache bust the eyewitness layer if it's accessed on a different day. 
        geoeyewitness: './assets/layers/geoeyewitness.js?bust=' + (function(){var d = new Date(); var n =d.getMonth() + d.getDay() + d.getYear(); return n})(),
        leaflet: "//leafletjs.com/dist/leaflet",
        esriLeaflet: 'http://cdn-geoweb.s3.amazonaws.com/esri-leaflet/1.0.0-rc.3/esri-leaflet',
        minimap: './assets/plugins/minimap/Control.MiniMap',
        text: './assets/plugins/text',
        omnivore: '//api.tiles.mapbox.com/mapbox.js/plugins/leaflet-omnivore/v0.2.0/leaflet-omnivore.min',
        jquery: "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min",
        bootstrap: "//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min",
        magnificent: "./assets/lib/magnificent",
        map: "./controllers/map"
    },
    waitSeconds: 0
};