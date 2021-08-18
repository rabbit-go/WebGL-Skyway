const channelId = 'rabbit-go@twincam';
const debug = false;
var sora = null;
const options = {
    videoBitRate: 15000
}
var recvonlyL;
var recvonlyR;
function MakeCall(yourid) {
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
    const conn = Ayame.connection('wss://ayame-labo.shiguredo.jp/signaling', channelId + camerastr);
    conn.options.video.direction = 'recvonly';
    conn.options.audio.direction = 'recvonly';
    conn.options.signalingKey = 'YxBUizkGKEg-ydXX_M4C1ILrP606cTJKBfN-0DHdaUCdrILQ';
    conn.connect(null);
    return conn;
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
