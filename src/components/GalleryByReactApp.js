'use strict';
var React = require('react/addons');
// CSS
require('normalize.css');
require('../styles/main.scss');
//get images data
var imageDatas = require('../data/imageDatas.json');
//transfer images info to images URL by self-excutive function
imageDatas = (function genImageURL(imageDatasArr) {
	for (var i = 0, j = imageDatasArr.length; i < j; i++) {
		var singleImageData = imageDatasArr[i];
		singleImageData.imageURL = require('../images/' + singleImageData.fileName);
		imageDatasArr[i] = singleImageData;
	}
	return imageDatasArr;
})(imageDatas);

var ImgFigure = React.createClass({

	render: function() {
		return (
			<figure className="img-figure">
					<img src={this.props.data.imageURL} alt={this.props.data.title}/>
					<figcaption>
						<h2 className="img-title">{this.props.data.title}</h2>
					</figcaption>
			</figure>
		);
	}
});

var GalleryByReactApp = React.createClass({
	Constant: {
		centerPos: {
			left: 0,
			right: 0
		},
		hPosRange: {
			leftSecX: [0, 0],
			rightSecX: [0, 0],
			y: [0, 0]
		},
		vPosRange: {
			x: [0, 0],
			topY: [0, 0]
		}
	},

	getInitialState: function() {
		return {


		};
	},
	//relocate image
	rearrange: function(centerIndex) {

		}
		//after image mounted, caculate position range for every image
	componentDidMount: function() {
		//get stage size
		var stageDOM = React.findDOMNode(this.refs.stage),
			stageW = stageDOM.scrollWidth,
			stageH = stageDOM.scrollHeight,
			halfStageW = Math.ceil(stageW / 2),
			halfStageH = Math.ceil(stageH / 2);
		//get imgFigure size
		var imgFigureDOM = React.findDOMNode(this.refs.imgFigure0),
			imgW = imgFigureDOM.scrollWidth,
			imgH = imgFigureDOM.scrollHeight,
			halfImgW = Math.ceil(imgW / 2),
			halfImgH = Math.ceil(imgH / 2);
		// caculate center image position
		this.Constant.centerPos = {
			left: halfStageW - halfImgW,
			top: halfStageH - halfImgH
		};
		//caculate the range of images' location in left and right section
		this.Constant.hPosRange.leftSecX[0] = -halfImgW;
		this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
		this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
		this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
		this.Constant.vPosRange.y[0] = -halfImgH;
		this.Constant.vPosRange.y[1] = stageH - halfImgH;
		//caculate the range of images' location in top section
		this.Constant.vPosRange.topY[0] = -halfStageH;
		this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
		this.Constant.vPosRange.x[0] = halfStageW - imgW;
		this.Constant.vPosRange.x[1] = halfStageH;

		this.rearrange(0);
	},


	render: function() {
		var controllerUnits = [];
		var imgFigures = [];
		imageDatas.forEach(function(value, index) {
			if (!this.state.imgsArrangeArr[index]) {
				this.stage.imgsArrangeArr[index] = {
					pos: {
						left: 0,
						top: 0
					}
				}
			}
			imgFigures.push(<ImgFigure data={value} ref={'imgFigure' + index}/>);
		}.bind(this));


		return (
			<section className="stage" ref="stage">
					<section className="img-sec">
						{imgFigures}
					</section>
					<nav className="controller-nav">
						{controllerUnits}
					</nav>
					</section>
		);
	}
});

React.render(<GalleryByReactApp/>, document.getElementById('content'));

module.exports = GalleryByReactApp;
