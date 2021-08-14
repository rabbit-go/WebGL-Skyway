const channelId = 'rabbit-go@twincam';
const debug = false;
const sora;
const options = {
    multistream: true
}
var recvonlyL;
var recvonlyR;
function MakeCall(yourid) {
    sora = Sora.connection('wss://sora-labo.shiguredo.jp/signaling', debug);
    recvonlyL = MakeCallfunc(yourid, "left");
    recvonlyR = MakeCallfunc(yourid, "right");
    recvonlyL.on("track", (event) => {
        const stream = event.streams[0];
        if (stream.id.includes('cam')) {
            let video = document.getElementById('LeftEye-video');
            video.srcObject = stream;
        }
    });
    recvonlyL.on("removetrack", (event) => {
        if (event.target.id.includes('cam')) {
            let video = document.getElementById('LeftEye-video');
            video.srcObject = null;
        }
    });
    recvonlyR.on("track", (event) => {
        const stream = event.streams[0];
        if (stream.id.includes('cam')) {
            let video = document.getElementById('RightEye-video');
            video.srcObject = stream;
        }
    });
    recvonlyR.on("removetrack", (event) => {
        if (event.target.id.includes('cam')) {
            let video = document.getElementById('RightEye-video');
            video.srcObject = null;
        }
    });
}
function MakeCallfunc(yourid, camerastr) {
    let recvonly;
    recvonly = sora.recvonly(yourid, null, options);
    recvonly.connect();
    recvonly.metadata = {
        "channel_id": channelId + camerastr,
        'signaling_key': 'k9eVLAMOzNGKUy0SbmjJgsho8Dh7afWvpc2AF1KDb3av86jY'
    };
    return recvonly;
}
function GetPersonList(id) {
    var element = document.getElementById(id);
    element.innerText = "";
    if (existingLeftCall == null) return;
    if (existingLeftCall.members == null) return;
    var i = 0;
    existingLeftCall.members.forEach(menber => {
        i++;
        element.innerText = i + '人';
    });
}


//切断処理
function EndCall() {
    recvonlyL.disconnect()
        .then(function () {
        });
    recvonlyR.disconnect()
        .then(function () {
        });
}
