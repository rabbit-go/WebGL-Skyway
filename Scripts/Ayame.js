'use strict';
let peer = null;
let existingLeftCall = null;
let existingRightCall = null;
const receiveOnly = true;    //受信専用かどうか
const VIDEO_CODEC = 'VP9';

function CreateVideoElement(id) {
    let s = document.createElement("video");
    s.setAttribute('id', id);
    s.setAttribute('width', '1920px');
    s.setAttribute('height', '1080px');
    document.body.appendChild(s);
    s.setAttribute('autoplay', '');
    s.setAttribute('muted', '');
    s.style.display = 'none';
}
var S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const options = {
    audio: { direction: 'recvonly', enabled: true },
    video: { direction: 'recvonly', enabled: true },
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    clientId: Array.from(Array(17)).map(() => S[Math.floor(Math.random() * S.length)]).join(''),
    signalingKey: 'YxBUizkGKEg-ydXX_M4C1ILrP606cTJKBfN-0DHdaUCdrILQ'
};

function MakeCallLeft() {
    const conn = Ayame.connection('wss://ayame-labo.shiguredo.jp/signaling', 'left', options, true);
    existingRightCall = conn;
    const startConn = async () => {
        await conn.connect(null);
        conn.on('disconnect', (e) => {
            console.log(e);
            existingLeftCall = null;
        });
        conn.on('addstream', (e) => {
            document.getElementById('LeftEye-video').srcObject = e.stream;
        });
    };
    startConn();

}
function MakeCallRight() {
    const conn = Ayame.connection('wss://ayame-labo.shiguredo.jp/signaling', 'right', options, true);
    conn.options.video.direction = 'recvonly';
    conn.options.audio.direction = 'recvonly';
    existingRightCall = conn;
    const startConn = async () => {
        await conn.connect(null);
        conn.on('disconnect', (e) => {
            console.log(e);
            existingRightCall = null;
        });
        conn.on('addstream', (e) => {
            document.getElementById('RightEye-video').srcObject = e.stream;
        });
    };
    startConn();
}

//切断処理
function EndCall() {
    if (existingLeftCall) existingLeftCall.disconnect();
    if (existingRightCall) existingRightCall.disconnect();
}


// Unityと連携するための関数群
let hoge = function () {
    return {
        // Unityからのメッセージを受け取るハンドラ登録
        InitializationEventListener: function () {
            window.addEventListener('message', function (event) {
                hoge.ExecuteJs(event.data);
            }, false);
        },
        // 受け取ったメッセージから、evalを使って関数を呼び出す
        ExecuteJs: function (message) {
            if (typeof (message) !== "string" && !(message instanceof String) || message == "null") {
                return;
            }
            var parameterObject = JSON.parse(message);
            var methodName = parameterObject.MethodName;
            var arg = parameterObject.arg;
            if (arg == undefined) {
                arg = "";
            }
            var evalString = methodName + '(' + arg + ')';
            eval(evalString);
        }
    };
}();
hoge.InitializationEventListener();
