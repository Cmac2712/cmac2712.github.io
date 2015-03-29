// Thumbview.jsx

'use strict'

var React = require('react');
var ThumbView;


module.exports = ThumbView = React.createClass({
    selectImage: function(image) {
	this.props.imageSrc = image;
	this.props.update(image);
    },
    /*
     * Check url is a valid imgur.com link or return.
     * In future support for multiple sites can be added but for now 
     * only img.
     * @param  {String}  - URL to test
     * @return {Boolean} - true if pass false if not
     */ 
    checkIsImgurLink: function (url) {
	return url.match(/i.imgur/) ? true : false;	    
    },	     
    render: function () {
	var that = this;
	var images = this.props.data.map(function (image) {

	    if (!that.checkIsImgurLink(image.data.url)) return;
	    var tn = image.data.thumbnail;	    
	    var style = { backgroundImage: 'url('+tn+')' }  
		
	    return (
		<div className="col-xs-6 col-sm-3 col-md-2"> 
		  <a href={image.data.url} onClick={function (e) { e.preventDefault(); this.selectImage(image.data.url) }.bind(this) }>
		    <div className="thumbnail" style={style}></div>
		  </a>
		</div>
	    )
	}.bind(this));

	return (
	    <div className="thumbnails container">
		{images}
	    </div>
	);
    }
});
