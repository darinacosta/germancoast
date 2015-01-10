define(['jquery'],

  function($){

    var htmlString = '',

    log = [
    {
      'date': '1.06.2015',
      'update': 'Layer toggle added.'
    },
    {
      'date': '1.05.2015',
      'update': 'Plantation vignette added.'
    },

    {
  	  'date': '1.03.2015',
  	  'update': 'Map events for Hurricane vignette synced up to 1:30.'
  	},

    {
  	  'date': '11.20.2014',
  	  'update': 'New full-screen layout implemented.'
  	}

  	],

	  buildHtmlString = (function(){
	  	for (var i = 0; i < log.length; i ++){
	  		htmlString = htmlString + log[i]['date'] + ': ' + '<i>' + log[i]['update'] + '</i><br>'
	  	}
	  })(),

	  init = function(){
      $('#production-log').html(htmlString);
    };

    return {init:init};

  }
)