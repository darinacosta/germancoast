define(['jquery',
         'map',
         'vignettes/home',
         'vignettes/labranche',
         'vignettes/hurricane',
         'vignettes/domination',
         'vignettes/eyewitness',
         'vignettes/plantationLand',
         'leaflet',
         'text!assets/html/menu.html',
         'esriLeaflet',
         'bootstrap'],

  function($, map, home, labranche, hurricane, domination, eyewitness, plantation, L, menuHtml){
    
    //Defining imagery labels here because I can't add them correctly when I define them in layers.js. 
    //Will fix this later.
    var imageryLabels = map.imageryLabels, 
        map = map.map,
        $navigation = $('#navigation-menu'),

    initializeController = function(){
      $navigation.find('.main-menu').on('click', function (e) { 
        imageryLabels.addTo(map);

        if (e.target.className === 'home-location-button newpage' || e.target.className === ''){
          map.removeLayer(imageryLabels);
          home.init();
        }else if (e.target.className === 'labranche-location-button newpage'){
          labranche.init();
        }else if (e.target.className === 'hurricane-location-button newpage'){ 
          hurricane.init();
        }else if (e.target.className === 'norco-location-button newpage'){ 
          domination.init();
        }else if (e.target.className === 'eyewitness newpage'){ 
          eyewitness.init();
        }else if (e.target.className === 'plantation-location-button newpage'){ 
          plantation.init();
        }
      })
    },

    init = (function(){
      $('#navigation-menu').html(menuHtml);
      initializeController();
    })();
  }
);