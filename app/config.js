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
        leaflet: "//leafletjs.com/dist/leaflet",
        esriLeaflet: 'http://cdn-geoweb.s3.amazonaws.com/esri-leaflet/1.0.0-rc.3/esri-leaflet',
        minimap: './assets/plugins/minimap/Control.MiniMap',
        omnivore: '//api.tiles.mapbox.com/mapbox.js/plugins/leaflet-omnivore/v0.2.0/leaflet-omnivore.min',
        jquery: "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min",
        bootstrap: "//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min",
        magnificent: "./assets/lib/magnificent",
        map: "./constructors/map"
    },
    waitSeconds: 0
};