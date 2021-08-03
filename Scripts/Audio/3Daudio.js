
// Super version: http://chromium.googlecode.com/svn/trunk/samples/audio/simple.html
class Vector2 {
    x = 0.0;
    y = 0.0;
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }
  class PositionSample {
    audioCtx = new (window.AudioContext)();
    isPlaying = false;
    createPanner(stream) {
      // Hook up the audio graph for this sample.
      const source = new MediaStreamAudioSourceNode(this.audioCtx, { mediaStream: stream });
      const panner = new PannerNode(this.audioCtx, { panningModel: "HRTF" });
      panner.coneOuterGain = 0.1;
      panner.coneOuterAngle = 360;
      panner.coneInnerAngle = 0;
      // Set the panner node to be at the origin looking in the +x
      // direction.
      source.connect(panner).connect(this.audioCtx.destination);
      // Position the listener at the origin.
      this.audioCtx.listener.setPosition(0, 0, 0);
      return panner;
    }
  
    changePosition(panner, position) {
      panner.setPosition(position.x, position.y, -0.5);
    };
    changeAngle(panner, angle) {
      //  console.log(angle);
      // Compute the vector for this angle.
      panner.setOrientation(Math.cos(angle), -Math.sin(angle), 1);
    };
  }
  
  
  function startStream() {
    const peer = new Peer('client', { key: '829682c4-f853-4d97-8691-aa0c10064efd' });
    const streams = new Array(4);
    peer.on("open", x => {
      const roomRF = peer.joinRoom("micRF", { mode: "mesh", audioReceiveEnabled: true, videoReceiveEnabled: false, stream: null });
      const roomRB = peer.joinRoom("micRB", { mode: "mesh", audioReceiveEnabled: true, videoReceiveEnabled: false, stream: null });
      const roomLF = peer.joinRoom("micLF", { mode: "mesh", audioReceiveEnabled: true, videoReceiveEnabled: false, stream: null });
      const roomLB = peer.joinRoom("micLB", { mode: "mesh", audioReceiveEnabled: true, videoReceiveEnabled: false, stream: null });
      roomRF.on("stream", stream => {
        if (stream != null) {
          streams[0] = stream;
          StartDirectionAudio(streams);
        }
      });
      roomRB.on("stream", stream => {
        if (stream != null) {
          streams[1] = stream;
          StartDirectionAudio(streams);
        }
  
      });
      roomLF.on("stream", stream => {
        if (stream != null) {
          streams[2] = stream;
          StartDirectionAudio(streams);
        }
  
      });
      roomLB.on("stream", stream => {
        if (stream != null) {
          streams[3] = stream;
          StartDirectionAudio(streams);
        }
  
      });
    });
  }
  function StartDirectionAudio(streams) {
    for (let i = 0; i < streams.length; i++) {
      if (streams[i] == null) { return; }
    }
    Create4DirectionAudio(streams);
  }
  var positionSample = new PositionSample();
  function Create4DirectionAudio(streams) {
  
    for (let i = 0; i < streams.length; i++) {
      var panner = positionSample.createPanner(streams[i]);
      let position = new Vector2(Math.cos(90 + (90 * i)), Math.sin(90 + (90 * i)))
      let angle = 180 + (90 * i);
      positionSample.changePosition(panner, position);
      positionSample.changeAngle(panner, angle);
    }
  }
  function setPosition(x, y) {
    context.listener.setPosition(x, y, 0);
  }
  function setOrientation(x, y) {
    myListener.setOrientation(x, y, 0, 0, 0, 1);
  }
  
  
