define(['jquery',
        'bootstrap'],

  function($){

  serveStaticContent = (function(){
    queryString = window.location.search.substring(1);
    if (queryString.indexOf('_escaped_fragment_') > -1){
      console.log('Serve static content');
    }
  })();

  init = function(){
    var hash = window.location.hash.replace('!/','');
    $('.main-menu a[href="' + hash + '"]').trigger('click');

    $(document).on('click', '.main-menu', function (e) {
      window.location.hash = '!/' + e.target.hash.split('#')[1];
    });
  }

  return {init:init};

});