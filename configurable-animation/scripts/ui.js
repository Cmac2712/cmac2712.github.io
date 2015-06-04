 define(['./animation'], function(Animation) {
	
     var animConfig = document.getElementById('animConfig');

     function init() {
	animConfig.addEventListener('submit', function (e) {
	   e.preventDefault(); 
	   var color = this.hex.value.slice(1) ? "#" + this.hex.value.slice(1) : this.color.value;
	    console.log(color);

	   Animation.option('power', this.power.value);
	   Animation.option('quantity', this.quantity.value);
	   Animation.option('particleHeight', this.size.value);
	   Animation.option('particleWidth', this.size.value);
	   Animation.option('canvasFill', color);
	});
	
	Array.prototype.forEach.call(document.getElementsByClassName('swatch'), function (elem) {
	    elem.addEventListener('click', function () {
		Animation.option('canvasFill', this.previousElementSibling.value); 
	    });
	});

	Animation.init(); 
     }	    	

     return {
	init: init
     }

});
