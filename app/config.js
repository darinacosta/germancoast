var require = {
    baseUrl: '.',
    shim : {
        "bootstrap" : { "deps" :['jquery'] },
        "magnificent": { "deps" :['jquery'] }
    },
    paths: {
        vignettes: './vignettes',
        helpers: './helpers',
        layers: './assets/layers',
        leaflet: "//leafletjs.com/dist/leaflet",
        omnivore: '//api.tiles.mapbox.com/mapbox.js/plugins/leaflet-omnivore/v0.2.0/leaflet-omnivore.min',
        jquery: "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min",
        bootstrap: "//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min",
        magnificent: "./assets/lib/magnificent"
    },
    waitSeconds: 0
};