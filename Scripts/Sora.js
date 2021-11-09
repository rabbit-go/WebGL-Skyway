const channelId = 'rabbit-go@twincam';
const debug = false;
var sora = null;
var recvonlyL;
var recvonlyR;
var channel_recvonly_connections = 0;
var options = {
    videoCodecType: "VP9"
}
function ChangeCodcType(codecType) {
    options = {
        videoCodecType: codecType
    };
}
function MakeCall() {
    MakeCallInit();
    MakeCallLeft();
    MakeCallRight();
}
function MakeDataChannel(id){
    let dataConnection = MakeCallfunc("data");
    let data = document.getElementById(id);
    dataConnection.on("push", (message, transportType) => {
        data.innerText = message;
        console.log(message);
      });
}
function MakeCallLeft() {
    recvonlyL = MakeCallfunc("left");
    recvonlyL.on("notify", (message, transportType) => {
        if (message.event_type == "connection.created" || message.event_type == "connection.updated" || message.event_type == "connection.destroyed") {
            channel_recvonly_connections = message.channel_recvonly_connections;
        }
    });
    recvonlyL.on("track", (event) => {
        const stream = event.streams[0];
        let video = document.getElementById('LeftEye-video');
        video.srcObject = stream;
    });
    recvonlyL.on("removetrack", (event) => {
        let video = document.getElementById('LeftEye-video');
        video.srcObject = null;
    });
}
function MakeCallRight() {
    recvonlyR = MakeCallfunc("right");
    recvonlyR.on("track", (event) => {
        const stream = event.streams[0];
        let video = document.getElementById('RightEye-video');
        video.srcObject = stream;
    });
    recvonlyR.on("removetrack", (event) => {
        let video = document.getElementById('RightEye-video');
        video.srcObject = null;

    });
}
function MakeCallInit() {
    sora = Sora.connection('wss://sora.ikeilabsora.0am.jp/signaling', debug);
    var c = document.getElementById('unity-canvas');
    c.addEventListener('mousedown', function (e) {
        let videor = document.getElementById('RightEye-video');
        let videol = document.getElementById('LeftEye-video');
        videor.play();
        videol.play();
    });
    c.addEventListener('touchstart', function (e) {
        let videor = document.getElementById('RightEye-video');
        let videol = document.getElementById('LeftEye-video');
        videor.play();
        videol.play();
    });

}
function MakeCallfunc(camerastr) {
    let recvonly;
    recvonly = sora.recvonly(channelId + camerastr, null, options);
    recvonly.connect();
    return recvonly;
}
function GetPersonList(id) {
    var element = document.getElementById(id);
    element.innerText = channel_recvonly_connections + 'Viewers';
}


//切断処理
function EndCall() {
    EndCallLeft();
    EndCallRight();
}
function EndCallLeft() {
    recvonlyL.disconnect()
        .then(function () {
        });
}
function EndCallRight() {
    recvonlyR.disconnect()
        .then(function () {
        });
}
