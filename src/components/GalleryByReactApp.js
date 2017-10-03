'use strict';
var React = require('react/addons');
// CSS
require('normalize.css');
require('../styles/main.scss');
//get images data
var imageDatas = require('../data/imageDatas.json');
//transfer images info to images URL by self-excutive function
imageDatas = (function genImageURL(imageDatasArr) {
	for (var i = 0, j = imageDatasrr.length; i < j; i++) {
		var singleImageData = imageDataArr[i];
		singleImageData.imageURL = require('../images/' + singleImageData.fileName);
		imageDataArr[i] = singleImageData;
	}
	return imageDatasArr;
})(imageDatas);
var GalleryByReactApp = React.createClass({
	render: function() {
		return (
			<section className="stage">
				<section className="img-sec">
 < /section> < nav className = "controller-nav" >
				</nav>
			</section>
		);
	}
});
React.render(<GalleryByReactApp/>, document.getElementById('content'));
module.exports = GalleryByReactApp;
