define(['jquery'],

function($){

  var $mapTabContent = $('.map-tab-content'),
      $liveContent = $('.live-content'),
      $contentToggle = $('#content-toggle'),

  initializeContentToggle = (function(){
    $('#content-toggle').on('click', function(){
      if ($mapTabContent.css('width') === '260px'){
        $mapTabContent.addClass('sidebar-collapsed');
        $liveContent.addClass('content-hidden');
        $contentToggle.css('left','9px');
        console.log($('.map-tab-content').css('width'));
      }else if($('.map-tab-content').css('width') === '30px'){
        $mapTabContent.removeClass('sidebar-collapsed');
        //Gotta do this or else the static content will appear beneath the dynamic content when we display the panel.
        if (window.location.hash === '#hurricane'){
          $liveContent.removeClass('content-hidden');
        }else{
          $liveContent.not('.map-tab-content-static').removeClass('content-hidden');
        }
        $contentToggle.css('left','239px');
      }
    })
  })()
});