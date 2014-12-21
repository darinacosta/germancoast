define({
	preload: function(arrayOfImages) {
	    $(arrayOfImages).each(function(){
	        (new Image()).src = this;
	    })
	}
})