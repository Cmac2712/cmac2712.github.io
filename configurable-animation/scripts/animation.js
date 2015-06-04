/*-------------------------------*\

@author Craig MacIntyre
@email  cmac2712@gmail.com

\*-------------------------------*/


define(['./notify'], function(Notify) {
	
	var canvasOptions = {};console.log(window.innerWidth);
	    canvasOptions.width = window.innerWidth/2;
	    canvasOptions.height = window.innerWidth/2;
	     
        var particles = {},
            particleIndex = 0,
            frame = 0,
            canvas = document.getElementById('canvasAnimation'),
            c = canvas.getContext('2d'),
	    carefull = new Notify.build({
		title: 'Careful',
		description: 'You would probably crash your browser doing that.',
		duration: 6000
	    }),
	    zip = new Notify.build({
		title: 'Looks Good',
		description: 'Zippidy zoop',
		duration: 6000
	    });

        /**
         * @desc Our default options for our particles
         */

        var options = {
            power: 0.1,
            vx: _randomVelocity,
            vy: _randomVelocity,
            particleHeight: 30,
            particleWidth: 30,
            particleColour: _randomColour,
            canvasFill: '#d66', 
            quantity: 15
        };

        /**
         * Change an option
         */

        function changeOption(key, val) {
	    
	    if (val == "" || val == undefined) return; 

	    if (val>2000)  {
		carefull.go();	
		return false;
	    }

            options[key] = val;
            deleteParicles();
            generateParticles();
        }

        /**
         * @return Random number
         * @param Multiplier
         */

        function _randomVelocity(m) {
            return (Math.random() * m)
        }

        /**
         * @return a Random rgba color value
         */

        function _randomColour() {
            // ( Math.floor(Math.random()*255) )
            return 'rgba(' + 0 + ',' + 0 + ',' + 0 + ',' + (Math.random().toFixed(1) * 0.1) + ')';
        }

        /**
         * @desc Clear the canvas for the next frame
         */

        function _clearCanvas() {
            c.fillStyle = options.canvasFill;
            c.fillRect(0, 0, canvas.width, canvas.height);
        }

        /**
         * @desc Particle constructor
         * @param Default options to construct the patticles
         */

        function _Particle(options) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = options.vx(options.power);
            this.vy = options.vy(options.power);

            this.height = options.particleHeight;
            this.width = options.particleWidth;

            this.colour = options.particleColour();
            particleIndex++;
            particles[particleIndex] = this;
            this.id = particleIndex;

            if (Math.random() > 0.5) this.vx = -this.vx;
            if (Math.random() > 0.2) this.vy = -this.vy;

	    this.draw = function() {
		this.x += this.vx;
		this.y += this.vy;

		if (this.x > canvas.width || this.x < 0) this.vx = -this.vx;

		if (this.y > canvas.height || this.y < 0) this.vy = -this.vy;

		c.fillStyle = this.colour;
		c.beginPath();
		c.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
		c.closePath();
		c.fill();
	    }
        }

        /**
         * @desc Set up the new frame
         */

        function _frames() {
            frame++;
            _clearCanvas();

            for (var i in particles) {
                particles[i].draw();
            }

            window.requestAnimationFrame(_frames);
        }

        /**
         * @return Draw the canvas
         */

        function drawCanvas() {
            canvas.width  = canvasOptions.width;
            canvas.height = canvasOptions.height;
        }

        /**
         * @desc Create the particles
         */

        function generateParticles() {

            particleIndex = 0;

            for (var i = 0; i < options.quantity; i++) {
                new _Particle(options);
            }

        }

        /**
         * @desc Delete particles
         */

        function deleteParicles() {
            for (var i in particles) {
                delete particles[i];
            }
        }

        /**
         * @desc Sets up the animation
         */

        function _draw() {
            drawCanvas();
            generateParticles();

            window.requestAnimationFrame(_frames);
        };

	/**
	 * Initiaite
	 */

	function init() {
	    _draw();
	}

        /**
         * @desc Expose the api
         */

        return {
            destroy: deleteParicles,
            particles: generateParticles,
            canvas: drawCanvas,
            option: changeOption,
            init: init
        }

    });
