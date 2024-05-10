import React from "react";
import YouTube from "react-youtube";


 class MovieClip extends React.Component {

    render() {
      const options = {
        height: '800',
        width: '1200',
        playerVars: {
          autoplay: 1,
          controls: 1,
        },
      };
  
      return <YouTube videoId={this.props.videoId} options={options} onReady={this._onReady} className="centered-video"/>;
    }
  
    _onReady(event) {
      event.target.pauseVideo();
    }
  }

  export default MovieClip;