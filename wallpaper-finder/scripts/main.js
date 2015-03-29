// main.js
/** @jsx React.DOM */

'use strict';


var data = "";

var api = new XMLHttpRequest();
    api.onload = function () { data = JSON.parse(this.responseText).data.children; renderView(); };
    api.open('get', 'http://www.reddit.com/r/wallpapers.json?t=year&limit=93', true);
    api.send();

var React = require('react');

var Application = require('./components/Application.jsx');

function renderView () {
    React.render(
      <Application data={data} />,
      document.getElementById('content')
    );
}
