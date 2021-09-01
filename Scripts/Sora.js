const channelId = 'rabbit-go@twincam';
const debug = false;
var sora = null;
const options = {
    videoBitRate: 15000
}
var recvonlyL;
var recvonlyR;
function MakeCall(yourid) {
    sora = Sora.connection('wss://p1-1f5b9b56.imageflux.jp/singaling', debug);
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
    recvonly = sora.recvonly(channelId + camerastr, null, options);

    recvonly.metadata = {
        'signaling_key': 'eyJ0b2tlbiI6IjFmZjUwMzQ2NTY4NjQ2ZTk5OTYyOTc0ZDQ2YzQ4YWIzNTk0Mjk4MDFjZDk5OWI2Zjc5MzNmZDk4YWUzZWNmY2YifQ'
    };
    recvonly.connect();
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
