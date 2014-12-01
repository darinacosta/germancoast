define(

  function pop_labrancheDevelopments(feature, layer) {
    var popupContent = '<table><tr><h3>' + feature.properties.NAME + '</h3></tr><tr><th scope="row">ACRES:</th><td style="padding:5px;">'+ feature.properties.ACREAGE + '</td></tr></table>';
    layer.bindPopup(popupContent);
  };

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
    onEachFeature: pop_labrancheDevelopments,
    style: function (feature) {
      return {color: "#960000",
        fillColor: "#642800",
        fillOpacity: 0.4,
        weight: 1s}
    }
  });

});