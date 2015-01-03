define(['jquery'],

  function($){

    var htmlString = '',

    log = [

    {
  	  'date': '1.03.2015',
  	  'update': 'Map events for Hurricane module synced up to 1:30.'
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
	  })();

	  $('#production-log').html(htmlString);

  }
)