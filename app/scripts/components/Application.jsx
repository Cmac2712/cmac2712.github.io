// Application.jsx

'use strict'

var React = require('react');
var Application;
var ImageViewer = require('./ImageViewer.jsx'); 
var ThumbView   = require('./ThumbView.jsx'); 

module.exports = Application = React.createClass({

    getInitialState: function () {
        return { imageSrc: this.props.data[0].data.url }
    },
    handleImageUpdate: function (imageSrc) {
	this.setState({
	    imageSrc: imageSrc
	}); 
    },
    render: function () {
	var currentImage = this.state.imageSrc; 	
	return (
	    <div>
		<ImageViewer displayedImage={currentImage} data={this.props.data} />
		<ThumbView update={this.handleImageUpdate} data={this.props.data} />
	    </div>
	);
    }
});
