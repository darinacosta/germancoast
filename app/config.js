var require = {
    baseUrl: '.',
    shim : {
        "bootstrap"  : { "deps" : ['jquery'] },
        "magnificent": { "deps" : ['jquery'] },
        "esriLeaflet": { "deps" : ['leaflet'] },
        "omnivore"   : { "deps" : ['leaflet'] }    },
    paths: {
        vignettes: 'vignettes',
        helpers: 'helpers',
        layers: 'assets/layers',
        //Cache bust the eyewitness layer if it's accessed on a different day. 
        geoeyewitness: 'assets/layers/geoeyewitness.js?bust=' + (function(){var d = new Date(); var n =d.getMonth() + d.getDay() + d.getYear(); return n})(),
        leaflet: "assets/lib/leaflet",
        esriLeaflet: 'assets/lib/esri-leaflet',
        minimap: './assets/plugins/minimap/Control.MiniMap',
        text: 'assets/plugins/text',
        hbs: 'assets/lib/require-handlebars-plugin/hbs',
        omnivore: 'assets/lib/leaflet-omnivore.min',
        jquery: "assets/lib/jquery.min",
        bootstrap: "assets/lib/bootstrap.min",
        magnificent: "assets/lib/magnificent",
        map: "controllers/map"
    },
    hbs: { // optional
        helpers: true,            // default: true
        i18n: false,              // default: false
        templateExtension: 'html', // default: 'hbs'
        partialsUrl: ''           // default: ''
    },
    waitSeconds: 0
};