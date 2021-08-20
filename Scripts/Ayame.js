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
    recvonlyL.on("addstream", (event) => {
        const stream = event.stream;
        let video = document.getElementById('LeftEye-video');
        video.srcObject = stream;

    });
    recvonlyL.on("disconnect", (event) => {
        let video = document.getElementById('LeftEye-video');
        video.srcObject = null;

    });
    recvonlyR.on("addstream", (event) => {
        const stream = event.stream;
        let video = document.getElementById('RightEye-video');
        video.srcObject = stream;

    });
    recvonlyR.on("disconnect", (event) => {
        let video = document.getElementById('RightEye-video');
        video.srcObject = null;

    });
}
function MakeCallfunc(yourid, camerastr) {
    let recvonly;
    const conn = Ayame.connection('ws://ikei-tamalab-vpn.softether.net:3000/signaling', channelId + camerastr);
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
