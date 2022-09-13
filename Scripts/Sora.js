const channelId = 'rabbit-go@twincam';
const debug = false;
var sora = null;
var recvonlyL;
var recvonlyL_mobile;
var recvonlyR;
var recvonlyR_mobile;
var recvonlyDataChannel;
var channel_recvonly_connections = 0;
var options = {
    videoCodecType: "H264",
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
    multistream: true,
    video: true,
    audio: false,
    dataChannelSignaling: true,
    dataChannels: [
        {
            label: "#sora-devtools",
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
       // if (data == null) return;
      //  if (!message.hasOwnProperty("data")) return;
       // if (!message.data.hasOwnProperty("Deg")) return;
      //  data.innerText = message.data.Deg;
    });
}
function InitDataChannel(){
    if(recvonlyDataChannel==null){   
    recvonlyDataChannel = sora.recvonly("robots-control", null, optionsDatachannel);
    recvonlyDataChannel.on('message', (message) => {    
        if(message[0]==0xe0){
        let msg = message[1]<<8 | message[2];
        ReactUnityWebGL.VRRotation(msg);
    }
    });
    recvonlyDataChannel.connect();
    }
}
function MakeCallLeft(){
    MakeCallLeft("rabbit-go@twincamleft") ;
}
function MakeCallLeft(id) {
   recvonlyL = MakeCallLeftInternal(id,'LeftEye-video');
}
function MakeCallLeftMobile(id) {
  recvonlyL_mobile =  MakeCallLeftInternal(id,'LeftEye-video-mobile');
}
function MakeCallLeftInternal(id,tag) {
    if(id==null){
        id = "rabbit-go@twincamleft";
    }
   let recvonly = MakeCallfunc(id);
    recvonly.on("notify", (message, transportType) => {
        if (message.event_type == "connection.created" || message.event_type == "connection.updated" || message.event_type == "connection.destroyed") {
            channel_recvonly_connections = message.channel_recvonly_connections;
        }
    });
    recvonly.on('message', (message) => {    
        let msg = new TextDecoder().decode(message.data);
        ReactUnityWebGL.RotationViewer(msg);
    });
    recvonly.on("track", (event) => {
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
    recvonly.on("removetrack", (event) => {
        let video = document.getElementById(tag);
        video.srcObject = null;
    });
    return recvonly;
}
let rightStream;
let leftStream;
function MakeCallRight(){
    MakeCallRight("rabbit-go@twincamright") ;
}
function MakeCallRight(id) {
    recvonlyR = MakeCallRightInternal(id,'RightEye-video');
}
function  MakeCallRightMobile(id) {
   recvonlyR_mobile = MakeCallRightInternal(id,'RightEye-video-mobile');
}
function MakeCallRightInternal(id,tag) {
     if(id==null){
        id = "rabbit-go@twincamright";
    }
    let recvonly = MakeCallfunc(id);
    recvonly.on("track", (event) => {
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
    recvonly.on("removetrack", (event) => {
        let video = document.getElementById(tag);
        video.srcObject = null;

    });
    return recvonly;
}
function MakeCallInit() {
   // sora = Sora.connection('wss://sora.ikeilabsora.0am.jp/signaling', debug);
    if(sora==null){  
    sora = Sora.connection('ws://192.168.11.64:5000/signaling', debug);
    }
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
