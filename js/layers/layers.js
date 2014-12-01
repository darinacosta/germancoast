define(

    layers = {
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

      shellProperties: omnivore.kml('./layers/shell_properties_v1.kml').on('ready', function() {
        this.setStyle({color: "#960000",
          fillColor: "#642800",
          fillOpacity: 0.6,
          weight: 1});
      })
    }
);