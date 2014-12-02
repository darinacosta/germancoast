define(
  var map = L.map('map', {
  zoomControl: false
  }).setView([30.0339, -90.4008],11);

  // Disable drag and zoom handlers.
	map.touchZoom.disable();
	map.doubleClickZoom.disable();
	map.scrollWheelZoom.disable();

	// Disable tap handler, if present.
	if (map.tap) map.tap.disable();

	map.on('click', function(e) {
	  console.log(e.latlng);
	});

	L.esri.basemapLayer("Imagery",{attribution:'<a class="video-link" href="./bibliography.html">Bibliography & Attribution</a> | Contact'}).addTo(map);
	imageryLabels = L.esri.basemapLayer('ImageryLabels');

	var miniMapLayer = new L.esri.basemapLayer("Imagery",{attribution:'Basemap: ESRI'});
	var miniMap = new L.Control.MiniMap(miniMapLayer, {
	  toggleDisplay: true,
	  zoomLevelOffset:-4,
	  position: 'bottomright'
	}).addTo(map);
);