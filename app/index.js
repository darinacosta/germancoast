

  /********************/
 /******BEGIN APP*****/
/********************/

require(['jquery',
         'vignettes/home',
         'layers/layers',
         'map',
         'helpers/persistenceControl',
         'helpers/stateControl',
         'helpers/imageHelpers',
         'controllers/contentToggleControl',
         'helpers/hurricaneVideoControl',
         'controllers/menuController',
         'magnificent'],

  function($, home, layers, map, persistenceControl, stateControl, imageHelpers, contentToggleControl){
    
    var map = map.map;

    $(document).ready(function() {
      //Can't cache these css selectors due to dynamically loaded content
      $('.map-tab-content .image-link').magnificPopup({type:'image'});
      $('.video-link').magnificPopup({type:'iframe'});
    }); 
    
    $('[data-toggle="popover"]').popover({
        trigger: 'hover',
        'placement': 'bottom'
    });

    if (window.location.hash == ''){ home.init(); };
    
    //Preload any large images
    $(document).ready( function (){
      $('#load-screen').fadeOut( "slow", function(){
        imageHelpers.preload(['http://verylongroad.com/gis/services/plantation_test_v1.jpg']);
      });
    });
  
    persistenceControl.init();
  }
);
