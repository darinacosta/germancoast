  /********************/
 /******BEGIN APP*****/
/********************/

var germancoastapp = {layers:{}};

require(['jquery',
         'vignettes/home',
         'helpers/imageHelpers',
         'controllers/contentToggleControl',
         'controllers/persistenceControl',
         'controllers/hurricaneVideoControl',
         'controllers/menuController',
         'magnificent'],

  function($, home, imageHelpers, contentToggleControl, persistenceControl){
    
    persistenceControl.init();
    if (window.location.hash == ''){ home.init(); };
    
    $(document).ready( function (){
      $('#load-screen').fadeOut( "slow", function(){
        //Preload plantation base layer
        imageHelpers.preload(['http://verylongroad.com/gis/services/plantation_test_v1.jpg']);
      });
      $('.map-tab-content .image-link').magnificPopup({type:'image'});
      $('.video-link').magnificPopup({type:'iframe'});
      $('[data-toggle="popover"]').popover({
        trigger: 'hover',
        'placement': 'bottom'
      });
    });
  }
);
