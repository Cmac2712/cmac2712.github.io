//  Imageviewer.jsx

'use strict'

var React = require('react');
var ImageViewer;

module.exports = ImageViewer = React.createClass({
    parseImgurUrl: function (url) {
	if (!url.match(/\/i\./)) {
	    console.log('fixed')
	    return url.split('//').join('//i.')+'.jpg';
	}
	return url;
    },
    render: function () {
	var url = this.parseImgurUrl(this.props.displayedImage);
	return (
	    <div className="viewer">
		<img src={url} alt="" />
		<a href={url} >VIEW FULL SIZE</a>
	    </div>
	);
    }
});

