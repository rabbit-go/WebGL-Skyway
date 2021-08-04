
// Super version: http://chromium.googlecode.com/svn/trunk/samples/audio/simple.html
class Vector3 {
    x = 0.0;
    y = 0.0;
    z = 0.0;
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
class PositionSample {
    audioCtx = document.audioContext;
    isPlaying = false;
    createPanner(stream) {

        var audio = document.createElement('audio');
        document.head.appendChild(audio);
        audio.srcObject = stream;
        audio.muted = true;
        // Hook up the audio graph for this sample.
        const source = new MediaStreamAudioSourceNode(document.audioContext, { mediaStream: stream });
        const panner = new PannerNode(document.audioContext, { panningModel: "HRTF" });
        //panner.coneOuterGain = 0.1;
        // panner.coneOuterAngle = 360;
        //panner.coneInnerAngle = 0;

        panner.panningModel = 'HRTF';
        panner.distanceModel = 'inverse';
        panner.refDistance = 3;
        panner.maxDistance = 10000;
        panner.rolloffFactor = 1;
        panner.coneInnerAngle = 360;
        panner.coneOuterAngle = 0;
        panner.coneOuterGain = 0;




        // Set the panner node to be at the origin looking in the +x
        // direction.
        source.connect(panner).connect(document.audioContext.destination);
        // Position the listener at the origin.
        document.audioContext.listener.setPosition(0, 0, 0);
        return panner;
    }

    changePosition(panner, position) {
        panner.setPosition(position.x, position.y, -0.5);
    };
    changeAngle(panner, rotation) {
        //  console.log(angle);
        // Compute the vector for this angle.
        panner.setOrientation(rotation.x, rotation.y, rotation.z);
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
    var panner = positionSample.createPanner(streams[0]);
    var position = new Vector3(1, -1, 1);
    var angle = new Vector3(-35.264, -135, 0);
    positionSample.changePosition(panner, position);
    positionSample.changeAngle(panner, angle);
    panner = positionSample.createPanner(streams[1]);
    position = new Vector3(1, 1, -1);
    angle = new Vector3(35.264, -45, 0);
    positionSample.changePosition(panner, position);
    positionSample.changeAngle(panner, angle);
    panner = positionSample.createPanner(streams[2]);
    position = new Vector3(-1, 1, 1);
    angle = new Vector3(35.264, 135, 0);
    positionSample.changePosition(panner, position);
    positionSample.changeAngle(panner, angle);
    panner = positionSample.createPanner(streams[3]);
    position = new Vector3(-1, -1, -1);
    angle = new Vector3(-35.264, 45, 0);
    positionSample.changePosition(panner, position);
    positionSample.changeAngle(panner, angle);
}
function setPosition(x, y) {
    context.listener.setPosition(x, y, 0);
}
function setOrientation(x, y) {
    document.audioContext.listener.setOrientation(x, y, 0, 0, 0, 1);
}


