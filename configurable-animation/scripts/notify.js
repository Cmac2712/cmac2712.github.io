/**
 *
 * Notify.js
 * @author Craig Macintyre
 * @todo comment everythind 
 * @todo destroy method add to prototype
 *
 */ 

define(function () {
	
	var snippet = "",
	    appendee = document.getElementsByTagName('body')[0];

	    snippet+= "<div class='notify'>";
	    snippet+= "    <div class='notify__img'></div>";
	    snippet+= "	   <h2 class='notify__title'></h2>";
	    snippet+= "    <p class='notify__description'></p>";
	    snippet+= "</div>",
	    
	    notifications = [],
	    notificationIndex = 1,

	    defaults = {
		id: '',
		title: "",
		description: "",
		duration: 5000
	    }

	function _append () {
	    appendee.insertAdjacentHTML('afterbegin', snippet);
	}

        function _extend ( defaults, options  ) {
	// http://gomakethings.com/vanilla-javascript-version-of-jquery-extend/
	        var extended = {};
		    var prop;
		    for (prop in defaults) {
			if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
			                extended[prop] = defaults[prop];
					        
			}
			    
		    }
		    for (prop in options) {
			if (Object.prototype.hasOwnProperty.call(options, prop)) {
			                extended[prop] = options[prop];
					        
			}
			    
		    }
		        return extended;
	}

	function _insertText (title, description) {
	    var notifyNode = appendee.querySelector('.notify'), 
		titleNode  = notifyNode.querySelector('.notify__title'), 
		descNode   = notifyNode.querySelector('.notify__description');	
	    
	    titleNode.appendChild(document.createTextNode(title));
	    descNode.appendChild(document.createTextNode(description));

	    return notifyNode;
	}

	function Build (options) {
	   
	   var notifys = document.getElementsByClassName('notify');
	    
	    this.config = _extend(defaults, options);

	    _append();
	    notifys[0].setAttribute('id', 'notify-'+notificationIndex);
	    
	    this.config.id = 'notify-'+notificationIndex;
	    _insertText(this.config.title, this.config.description);
	    
	    notificationIndex++;
	}

	Build.prototype.go = function () {
	    var domNode = document.getElementById(this.config.id); 

		domNode.classList.add('active');
		
		setTimeout(function(){
		    domNode.classList.remove('active');
		}, this.config.duration);
	}

	function destroy () {
	    appendee.querySelector('#notify').parentNode.removeChild(appendee.querySelector('#notify'));
	}

	return {
	    build: Build
	}

});
