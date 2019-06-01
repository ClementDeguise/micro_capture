import React, { Component } from 'react';

class AudioVisualiser extends Component {
 

	constructor(props) {
	    super(props);
	    this.canvasRef = React.createRef();
	}


	// ref are used to modify components ouside the typical dataflow, eg for imperative animations
	// or managing focus, text selection or media playback

	// https://reactjs.org/docs/refs-and-the-dom.html



	/*
	Let's build a function that will draw a waveform on the canvas.

	The idea is to take the audioData we created in the previous component and draw a line from left to right 
	between each data point in the array.

	Start with a new function called draw. 
	This function will be called each time we get new data from the analyser. 
	We start by setting up the variables we want to use:

	    -the audioData from the props and its length
	    -the canvas from the ref
	    -the height and width of the canvas
	    -a 2d drawing context from the canvas
	    -x which will be used to track across the canvas
	    -sliceWidth, the amount we will move to the right every time we draw
	

	Now we start to work to build up the picture we're going to draw on the canvas. 
	First setting our drawing style, in this case setting a line width of 2 and stroke style to the colour black. 
	Then we clear previous drawings from the canvas.

	Next, begin the path we are going to draw and move the drawing position to halfway down the left side of the canvas.

	Loop over the data in audioData. 
	Each data point is between 0 and 255. 
	To normalise this to our canvas we divide by 255 and then multiply by the height of the canvas. 
	We then draw a line from the previous point to this one and increment x by the sliceWidth.



	*/

	draw() {
	    const { audioData } = this.props;
	    const canvas = this.canvasRef.current;
	    const height = canvas.height;
	    const width = canvas.width;
	    const context = canvas.getContext('2d');
	    let x = 0;
	    // quantification of the drawing
	    const sliceWidth = (width * 1.0) / audioData.length;

		context.lineWidth = 2;
	    context.strokeStyle = '#000000';
	    context.clearRect(0, 0, width, height);

		context.beginPath();
    	context.moveTo(0, height / 2);



		for (const item of audioData) {
	      const y = (item / 255.0) * height;
	      context.lineTo(x, y);
	      x += sliceWidth;
    	}

	    context.lineTo(x, height / 2);
    	context.stroke();
	}



	componentDidUpdate() {
	this.draw();
	}



	render() {
		return (
			<canvas width="600" height="300" ref={this.canvasRef} />
		)
	}




}

export default AudioVisualiser;