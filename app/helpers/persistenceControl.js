define(['jquery',
        'bootstrap'],

  function($){

  init = function(){
    var hash = window.location.hash;
    $('.main-menu a[href="' + hash + '"]').trigger('click');

    $(document).on('click', '.main-menu', function (e) {
      console.log(e);
      if (e.target.className == 'home-location-button newpage'){
        window.location.hash = '';
      }else{
        window.location.hash = e.target.hash;
      }
    });
  }

  return {init:init};

});