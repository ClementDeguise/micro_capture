import React, { Component } from 'react';
import AudioVisualiser from './AudioVisualizer'

class AudioAnalyser extends Component {
 

	constructor(props) {
	    super(props);
	    this.state = { audioData: new Uint8Array(0) };
	    this.tick = this.tick.bind(this);
	}

	/*
	When the component mounts we're going to setup the Web Audio API objects. 
	First we create a new AudioContext. 
	Then we'll create an AnalyserNode that will do the heavy lifting for us.

	From the AnalyserNode we need to know the frequencyBinCount which, according to the documentation, 
	generally equates to the number of data values that will be available to play with for a visualisation. 

	We'll create an array of 8-bit unsigned integers, a Uint8Array, the length of the frequencyBinCount. 
	This dataArray will be used to store the waveform data that the AnalyserNode will be creating.

	We passed the media stream from the microphone into the component as a prop and we need to turn it into 
	a source for the Web Audio API. To do this, call createMediaStreamSource on the AudioContext object, 
	passing in the stream. Once we have the source we can then connect the analyser.
	*/


	componentDidMount() {
	    this.audioContext = new (window.AudioContext)();
	    this.analyser = this.audioContext.createAnalyser();
	    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
	    this.source = this.audioContext.createMediaStreamSource(this.props.audio);
	    this.source.connect(this.analyser);
	    this.rafId = requestAnimationFrame(this.tick);
	}


	/*
	This still isn't doing any analysis for us yet.

	For that, we'll need to call upon the AnalyserNode's 
	getByteTimeDomainData method every time we want to update the visualisation. 

	Since we will be animating this visualisation, we'll call upon the browser's requestAnimationFrame API 
	to pull the latest audio data from the AnalyserNode everytime we want to update the visualisation.

	To do this, we'll create a method that will be called every time requestAnimationFrame runs. 
	The function will copy the current waveform as an array of integers, from the AnalyserNode into the dataArray. 
	It will then update the audioData property in the component's state with the dataArray. 

	Finally, it will call on requestAnimationFrame again to request the next update.

	We kick off the animation loop from the end of 
	the componentDidMount method after we connect the source to the analyser.

	We'll initialise the state of the component in the constructor, 
	with an empty Uint8Array and also bind the scope of the tick function to the component.

	*/

	tick() {
	    this.analyser.getByteTimeDomainData(this.dataArray);
	    this.setState({ audioData: this.dataArray });
	    this.rafId = requestAnimationFrame(this.tick);
	}


	componentWillUnmount() {
	    cancelAnimationFrame(this.rafId);
	    this.analyser.disconnect();
	    this.source.disconnect();
	}		



	render() {
		return (
			<AudioVisualiser audioData={this.state.audioData} />
		);
	}


}

export default AudioAnalyser;