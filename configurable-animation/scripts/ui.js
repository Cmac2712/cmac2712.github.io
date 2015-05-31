 define(['./animation'], function(Animation) {
	
     var animConfig = document.getElementById('animConfig'),
	 power	    = document.getElementById('power'),
	 quantity   = document.getElementById('quantity'),
	 size       = document.getElementById('size');

     function init() {
	animConfig.addEventListener('submit', function (e) {
	   e.preventDefault(); 
	   console.dir(quantity.value);
	   Animation.option('power', power.value);
	   Animation.option('quantity', quantity.value);
	   Animation.option('particleHeight', size.value);
	   Animation.option('particleWidth', size.value);
	});

	Animation.init(); 
     }	    	

     return {
	init: init
     }

});
