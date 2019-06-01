import React from 'react';
import AudioAnalyser from './AudioAnalyser'


// https://www.twilio.com/blog/audio-visualisation-web-audio-api--react
// https://www.twilio.com/blog/audio-visualisation-web-audio-api--react
// https://www.twilio.com/blog/audio-visualisation-web-audio-api--react




class App extends React.Component {


  constructor() {
    super();
    this.state={
      audio: null
    }

    this.toggleMicrophone = this.toggleMicrophone.bind(this);
  }


  // We need a method that will use getUserMedia to request access to the microphone 
  // and set audio stream in the state if it is successful
  async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({ audio });
    console.log(audio);
    console.log(this.state);
    // audio is a stream here
  }

  // Add a method to stop the audio capture too. 
  // This loops through each of the MediaTracks associated with the MediaStream that 
  // getUserMedia returns and stops them, finally removing the stream from the state.
  stopMicrophone() {
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({ audio: null });
  }


  toggleMicrophone() {
    this.state.audio ? this.stopMicrophone() : this.getMicrophone();
  }



  // We're going to use this toggle method with the button in the interface. 
  // To do so, we'll need to bind its context to the component.



  render() {

    return (
      <div className="App">

        <header className="top-header"><b>React Microphone Visualization</b></header>


        <button className="micro-button" onClick={this.toggleMicrophone}>
          {this.state.audio ? "Turn Off Microphone" : "Get Microphone Input"}
        </button> 

        <div>
          {this.state.audio ? <AudioAnalyser audio={this.state.audio}/> : ''}
        </div>


      </div>
    )

  } 
}

export default App;
