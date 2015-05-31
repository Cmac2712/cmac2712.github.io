/**
 *
 * Notification.js
 * @author Craig Macintyre
 * @todo add stacking support
 *
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals
        root.notification = factory();
    }

}(this, function() {

    var

        notificationIndex = 1,

        /**
         * Default options
         */

        defaults = {
            id: '',
            title: '',
	    image: '',
	    imageAlt: '',
            description: '',
            appendee: document.getElementsByTagName('body')[0],
            duration: 5000,
            enterClass: 'slideDown',
            exitClass: 'slideUp'
        },

    /**
     * The HTML for notifications
     */

    snippet = '';
    snippet += '<div class="notification">';
    snippet += '    <div class="notification__img"><img src="" alt=""></div>';
    snippet += '	   <h2 class="notification__title"</h2>';
    snippet += '    <p class="notification__description"></p>';
    snippet += '</div>';

    /**
     * Add our notification markup to the appendee (body tag by default)
     */

    function _append(_this) {
        _this.config.appendee.insertAdjacentHTML('afterbegin', snippet);
    }

    /**
     * Merge defaults with user options
     * @param  {Object} defaults - Default options
     * @param  {Object} options  - User defined options
     * @return {Object} Merged values of defaults and options
     */

    function _extend(defaults, options) {
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

    /**
     * Insert the text into our notification
     * @param {String} title       - Notification title text
     * @param {String} description - Notification description text
     * @param {Object} appendee    - Our appendee
     */

    function _insertText(title, description, imagePath, imageAlt, appendee) {
        var notificationNode = appendee.querySelector('.notification'),
            titleNode  = notificationNode.querySelector('.notification__title'),
            descNode   = notificationNode.querySelector('.notification__description'),
	    imageNode  = notificationNode.querySelector('.notification__img').querySelector('img');

        titleNode.appendChild(document.createTextNode(title));
        descNode.appendChild(document.createTextNode(description));
	imageNode.src = imagePath;
	imageNode.alt = imageAlt;
    }

    /**
     * Adds classes to a dom node.
     * @param {String} classes - A string of space-separated classes or a single class
     * @param {Object} domNode - The dom node we want to apply classes to
     */

    function _addClasses(classes, domNode) {
        var classesArr = classes.split(' ');

        if (classesArr.length > 1) {
            classesArr.forEach(function(className) {
                domNode.classList.add(className);
            });
        } else {
            domNode.classList.add(classes);
        }
    }

    /**
     * Removes classes from a dom node
     * @param {String} classes - A string of space-separated classes or a single class
     * @param {Object} domNode - The dom node we want to remove classes from
     */

    function _removeClasses(classes, domNode) {
        var classesArr = classes.split(' ');

        if (classesArr.length > 1) {
            classesArr.forEach(function(className) {
                domNode.classList.remove(className);
            });
        } else {
            domNode.classList.remove(classes);
        }
    }

    /**
     * Construct a notification
     * @param {Object} options - User-defined options
     */

    function Build(options) {

        var notifications = document.getElementsByClassName('notification');

        this.config = _extend(defaults, options);

        _append(this);
        notifications[0].setAttribute('id', 'notification-' + notificationIndex);
        notifications[0].classList.add('notification-' + notificationIndex);

        this.config.id = 'notification-' + notificationIndex;
        _insertText(this.config.title, this.config.description, this.config.image, this.config.imageAlt, this.config.appendee);

        notificationIndex++;
    }

    /**
     * Reveal the notification
     */

    Build.prototype.go = function() {
        var domNode = document.getElementById(this.config.id),
            that    = this;

        _addClasses(this.config.enterClass, domNode);

        setTimeout(function() {
            _removeClasses(that.config.enterClass, domNode);
            _addClasses(that.config.exitClass, domNode);
            setTimeout(function() {
                _removeClasses(that.config.exitClass, domNode);
            }, 1000);
        }, this.config.duration);
    };

    /**
     * Remove the notification from the DOM
     */

    Build.prototype.destroy = function() {
        var elem = document.getElementById(this.config.id);

        elem.parentNode.removeChild(elem);
    };

    return Build;

}));
