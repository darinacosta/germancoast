define({
    drawPath: function(emptyPath, line, zoom){ 
      
      emptyPath.setLatLngs([]);
      map.removeLayer(imageryLabels);
      emptyPath.addTo(map);
      points = [];

      for (var key in line._layers){
	var latlngs = line._layers[key]._latlngs[0];
        var lat = latlngs['lat'];
	var lng = latlngs['lng'];
	points.push([lat,lng]);
     };

    var pointsAdded = 0;

    // Start drawing the polyline.
    add();

    function add() {
      if (pointsAdded < points.length - 1){
        emptyPath.addLatLng(points[pointsAdded]);
        if (pointsAdded < 29){
          map.setView(points[pointsAdded], zoom);
        }else{
          map.setView(new L.LatLng(30.001, -90.405), 7);
        }
        ++pointsAdded;
        window.setTimeout(add, 100);
      }
     }
    }
   }
 )
