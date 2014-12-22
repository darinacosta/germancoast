define(['jquery'],

  function($){

	preload = function(arrayOfImages) {
    $(arrayOfImages).each(function(){
        (new Image()).src = this;
    })
	}

  return {preload: preload};
  
})