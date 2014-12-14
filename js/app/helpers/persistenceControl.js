define({

  init: function(){
    var hash = window.location.hash;
    hash && $('ul.nav a[href="' + hash + '"]').tab('show');

    $('.nav-tabs a').click(function (e) {
      $(this).tab('show');
      if (e.target.className == 'home-location-button newpage'){
        window.location.hash = '';
      }else{
        window.location.hash = this.hash;
      }
    });
  }

});