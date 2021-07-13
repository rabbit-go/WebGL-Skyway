
// Super version: http://chromium.googlecode.com/svn/trunk/samples/audio/simple.html
var positionSample = new PositionSample();
function Create4DirectionAudio(streams) {
    for (let i = 0; i < 4; i++) {
        var panner = positionSample.createPanner(streams[i]);
        let position = new Vector2(cos(90 + (90 * i)), sin(90 + (90 * i)))
        let angle = 180 + (90 * i);
        positionSample.changePosition(panner, position);
        positionSample.changeAngle(panner, angle);
    }
}
function setPosition(x,y){
    context.listener.setPosition(x, y, 0);
}
function setOrientation(x,y){
    myListener.setOrientation(x,y,0,0,0,1);
}
PositionSample.prototype.createPanner = function (stream) {
    // Hook up the audio graph for this sample.
    var source = audioCtx.createMediaStreamSource(stream);
    var panner = context.createPanner();
    panner.coneOuterGain = 0.1;
    panner.coneOuterAngle = 180;
    panner.coneInnerAngle = 0;
    // Set the panner node to be at the origin looking in the +x
    // direction.
    panner.connect(context.destination);
    source.connect(panner);
    source.start(0);
    // Position the listener at the origin.
    context.listener.setPosition(0, 0, 0);
    return panner;
}


PositionSample.prototype.changePosition = function (panner, position) {
    // Position coordinates are in normalized canvas coordinates
    // with -0.5 < x, y < 0.5
    if (position) {
        if (!this.isPlaying) {
            this.play();
        }
        panner.setPosition(position.x, position.y, -0.5);
    } else {
        this.stop();
    }
};

PositionSample.prototype.changeAngle = function (panner, angle) {
    //  console.log(angle);
    // Compute the vector for this angle.
    panner.setOrientation(Math.cos(angle), -Math.sin(angle), 1);
};
