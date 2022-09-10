const channelId = 'rabbit-go@twincam';
const debug = false;
var sora = null;
var recvonlyL;
var recvonlyR;
var recvonlyDataChannel;
var channel_recvonly_connections = 0;
var options = {
    videoCodecType: "VP9",
    multistream: true,
    video: true,
    audio: true,
    dataChannelSignaling: true,
    dataChannels: [
        {
            label: "#sora-devtools",
            ordered: true,
            direction: "sendrecv"
        },
        {
            label: "#soraData",
            ordered: false,
            direction: "sendrecv"
        }
    ]
}
var optionsDatachannel = {
    videoCodecType: "VP9",
    multistream: true,
    video: true,
    audio: false,
    dataChannelSignaling: true,
    dataChannels: [
        {
            label: "#sora-devtools",
            ordered: true,
            direction: "sendrecv"
        }
    ]
}
function ChangeCodcType(codecType) {
    options = {
        videoCodecType: codecType,
        multistream: true,
        video: true,
        audio: true,
        dataChannelSignaling: true,
        ignoreDisconnectWebSocket: false
    };
}
function MakeCall() {
    MakeCallInit();
    MakeCallLeft();
    MakeCallRight();
}
function MakeDataChannel(id) {
    let dataConnection = MakeCallfunc("data");
    let data = document.getElementById(id);
    dataConnection.on("push", (message, transportType) => {
        if (data == null) return;
        if (!message.hasOwnProperty("data")) return;
        if (!message.data.hasOwnProperty("Deg")) return;
        data.innerText = message.data.Deg;
    });
}
function InitDataChannel(){
    recvonlyDataChannel = sora.recvonly("twincam-left", null, optionsDatachannel);
    recvonlyDataChannel.connect();
}
function MakeCallLeft(){
    MakeCallLeft("rabbit-go@twincamleft") ;
}
function MakeCallLeft(id) {
    MakeCallLeft(id,'LeftEye-video');
}
function MakeCallLeftMobile(id) {
    MakeCallLeft(id,'LeftEye-video-mobile');
}
function MakeCallLeft(id,tag) {
    if(id==null){
        id = "rabbit-go@twincamleft";
    }
    recvonlyL = MakeCallfunc(id);
    recvonlyL.on("notify", (message, transportType) => {
        if (message.event_type == "connection.created" || message.event_type == "connection.updated" || message.event_type == "connection.destroyed") {
            channel_recvonly_connections = message.channel_recvonly_connections;
        }
    });
    recvonlyL.on('message', (message) => {    
        let msg = new TextDecoder().decode(message.data);
        ReactUnityWebGL.RotationViewer(msg);
    });
    recvonlyL.on("track", (event) => {
        let video = document.getElementById(tag);
        if (video.srcObject == null) {
            video.srcObject = event.streams[0];
            var c = document.getElementById('unity-canvas-1');
            c.addEventListener('mousedown', function (e) {
                let videol = document.getElementById(tag);
                videol.play();
            });
            c.addEventListener('touchstart', function (e) {
                let videol = document.getElementById(tag);
                videol.play();
            });
        }
    });
    recvonlyL.on("removetrack", (event) => {
        let video = document.getElementById(tag);
        video.srcObject = null;
    });
}
let rightStream;
let leftStream;
function MakeCallRight(){
    MakeCallRight("rabbit-go@twincamright") ;
}
function MakeCallRight(id) {
    MakeCallRight(id,RightEye-video);
}
function MakeCallMobile(id) {
    MakeCallRight(id,RightEye-video-mobile);
}
function MakeCallRight(id,tag) {
     if(id==null){
        id = "rabbit-go@twincamright";
    }
    recvonlyR = MakeCallfunc(id);
    recvonlyR.on("track", (event) => {
        let video = document.getElementById(tag);
        if (video.srcObject == null) {
            video.srcObject = event.streams[0];
            var c = document.getElementById('unity-canvas-1');
            c.addEventListener('mousedown', function (e) {
                let videor = document.getElementById(tag);
                videor.play();
            });
            c.addEventListener('touchstart', function (e) {
                let videor = document.getElementById(tag);
                videor.play();
            });
        }

    });
    recvonlyR.on("removetrack", (event) => {
        let video = document.getElementById(tag);
        video.srcObject = null;

    });
}
function MakeCallInit() {
   // sora = Sora.connection('wss://sora.ikeilabsora.0am.jp/signaling', debug);
    sora = Sora.connection('ws://192.168.10.64:5000/signaling', debug);
}
function MakeCallfunc(camerastr) {
    let recvonly;
    recvonly = sora.recvonly(camerastr, null, options);
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
            let video = document.getElementById('LeftEye-video');
            video.srcObject = null;
        });
}
function EndCallRight() {
    if(recvonlyR==null)return;
    recvonlyR.disconnect()
        .then(function () {
            let video = document.getElementById('RightEye-video');
            video.srcObject = null;
        });
}
