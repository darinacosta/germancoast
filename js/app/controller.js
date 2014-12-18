define(['app/vignettes/home',
         'app/vignettes/labranche',
         'app/vignettes/hurricane',
         'app/vignettes/norco'],

  function(home, labranche, hurricane, norco){
    
    var activateController = function(){
      $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
          
        imageryLabels.addTo(map);

        if (e.target.className === 'home-location-button newpage' || e.target.className === ''){
          home.init();
        }else if (e.target.className === 'labranche-location-button newpage'){
          labranche.init();
        }else if (e.target.className === 'hurricane-location-button newpage'){ 
          hurricane.init();
        }else if (e.target.className === 'norco-location-button newpage'){ 
          norco.init();
        }
      })
    },

    init = function(){
      activateController();
    };

    return {init: init};
  }
);