

  /********************/
 /******BEGIN APP*****/
/********************/

require(['jquery',
         'vignettes/home',
         'layers/layers',
         'map',
         'helpers/persistenceControl',
         'helpers/screenHelpers',
         'helpers/imageHelpers',
         'helpers/hurricaneVideoControl',
         'controller',
         'magnificent'],

  function($, home, layers, map, persistenceControl, screenHelpers, imageHelpers, hurricaneVideoControl){
    
    $(document).ready(function() {
      $('.image-link').magnificPopup({type:'image'});
      $('.video-link').magnificPopup({type:'iframe'});
    }); 

    
    $('[data-toggle="popover"]').popover({
        trigger: 'hover',
        'placement': 'bottom'
    });

    if (window.location.hash == ''){ home.init(); };
    
    //Preload any large images
    $(window).load( function (){
      $('#load-screen').fadeOut( "slow", function(){
        imageHelpers.preload(['http://verylongroad.com/gis/services/plantation_test_v1.jpg']);
      });
    });
  
    persistenceControl.init();
  }
);
