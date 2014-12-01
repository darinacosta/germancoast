define({
    
  norcoLandUse: new L.geoJson(norco_landuses_general_v1,{
    style: function (feature) {
      return {fillColor: feature.properties.color_qgis2leaf,
        color: '#000',
        weight: 1,
        opacity: 0.5,
        fillOpacity: 0.6};
    }
  }),

  floodLanduse: new L.geoJson(norcolanduses_100YRFLOODPLAINDISSOLVE_v1,{
    style: function (feature) {
      return {fillColor: feature.properties.color_qgis2leaf,
        color: '#000',
        weight: 1,
        opacity: 0.5,
        fillOpacity: 0.6};
    }
  }),

  frenierTitleLayer: new function(){
    this.url = './i/FRENIER.png';
    this.bounds = [[30.108305899054287, -90.42065620422363], [30.10941964729591, -90.41722297668457]];
    return new L.imageOverlay(this.url, this.bounds);
  },

  labrancheDevelopments: new L.geoJson(labrancheDevelopmentsV1, {
    onEachFeature: function(feature, layer) {
      var popupContent = '<table><tr><h3>' + feature.properties.NAME + '</h3></tr><tr><th scope="row">ACRES:</th><td style="padding:5px;">'+ feature.properties.ACREAGE + '</td></tr></table>';
      layer.bindPopup(popupContent);
    },
    style: function (feature) {
      return {color: "#960000",
        fillColor: "#642800",
        fillOpacity: 0.4,
        weight: 1}
    }
  }),

  plantationsLayer: new function(){
    this.url = 'https://s3-us-west-2.amazonaws.com/darinacostamediafiles/gis/raster/river_parish_plantations_v1.jpg';
    this.bounds = [[29.70323, -91.45075,29.70323], [30.46062, -89.96876]];
    return new L.imageOverlay(this.url, this.bounds,{opacity: 1});
  },

  shellProperties: omnivore.kml('./layers/shell_properties_v1.kml').on('ready', function() {
    this.setStyle({color: "#960000",
      fillColor: "#642800",
      fillOpacity: 0.6,
      weight: 1});
  })

});