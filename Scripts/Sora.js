const channelId = 'rabbit-go@twincam';
const debug = false;
var sora = null;
var recvonlyL;
var recvonlyR;
var channel_recvonly_connections = 0;
function MakeCall(yourid) {
    sora = Sora.connection('wss://sora.ikeilabsora.0am.jp/signaling', debug);
    recvonlyL = MakeCallfunc(yourid, "left");
    recvonlyR = MakeCallfunc(yourid, "right");
    recvonlyL.on("track", (event) => {
        const stream = event.streams[0];
        let video = document.getElementById('LeftEye-video');
        video.srcObject = stream;

    });
    recvonlyL.on("removetrack", (event) => {
        let video = document.getElementById('LeftEye-video');
        video.srcObject = null;

    });
    recvonlyL.on("notify", (message, transportType) => {
        if(message.event_type=="connection.created" ||message.event_type=="connection.destroyed"){
            channel_recvonly_connections = message.channel_recvonly_connections;
        }
        console.log(message, transportType);
      });
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
function MakeCallfunc(yourid, camerastr) {
    let recvonly;
    recvonly = sora.recvonly(channelId + camerastr, null, null);

   
    recvonly.connect();
    return recvonly;
}
function GetPersonList(id) {
    var element = document.getElementById(id);
    element.innerText = channel_recvonly_connections + '人';
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
