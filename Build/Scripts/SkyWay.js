'use strict';
let peer = null;
let existingLeftCall = null;
let existingRightCall = null;
const receiveOnly = true;    //受信専用かどうか
const VIDEO_CODEC = 'VP9';

function CreateVideoElement(id) {
    let s = document.createElement("video");
    s.setAttribute('id', id);
    s.setAttribute('width', '400px');
    document.body.appendChild(s);
    s.style.display='none';
}
//peeridを取得 
function GetPeerId(yourid) {

    //peerオブジェクトの作成
    peer = new Peer(yourid, {
        key: '6cee6718-08d3-4ce7-93a9-237ecd4601bb',    //APIkey
        debug: 3
    });

    //イベント id取得後じゃないと動作しない

    //openイベント
    peer.on('open', function Open() {
    });

    //errorイベント
    peer.on('error', function Error(err) {
    });

    //closeイベント
    peer.on('close', function Close() {
    });

    //disconnectedイベント
    peer.on('disconnected', function Disconnected() {
    });

    //着信処理
    peer.on('call', function (call) {
        call.answer();
        setupCallEventHandlers(call);
    });

    return null;
}

//発信処理
function MakeCall(calltoid) {
    let localStream = null;
    const call = peer.call(calltoid, localStream, {     //空の動画を送る
        videoCodec: VIDEO_CODEC,                        //これを入れないと動画が再生できない
        videoReceiveEnabled: receiveOnly,                 //受信専用としてここで設定
        audioReceiveEnabled: receiveOnly,
    });
    return call;
}

function MakeCallLeft(calltoid) {
    MakeCall(calltoid);
    if (existingLeftCall) {
        existingLeftCall.close();
    };

    existingLeftCall = call;

    call.on('stream', function (stream) {
        $('#LeftEye-video').get(0).srcObject = stream;
    });

    call.on('close', function () {    //??なぜか実行された側で発火せず??
        $('#LeftEye-video').get(0).srcObject = undefined;
    });
    SendMessage('LeftEye', 'MyFunction', 'MyString');
}
function MakeCallRight(calltoid) {
    MakeCall(calltoid);
    if (existingRightCall) {
        existingRightCall.close();
    };
    existingRightCall = call;
    call.on('stream', function (stream) {
        $('#RightEye-video').get(0).srcObject = stream;
    });

    call.on('close', function () {    //??なぜか実行された側で発火せず??
        $('#RightEye-video').get(0).srcObject = undefined;
    });
}

//切断処理
function EndCall() {
    if (existingLeftCall) existingLeftCall.close();
    if (existingRightCall) existingRightCall.close();
}

function WebGLTextureUpdate(videoID, tex) {
    let videoElement = document.getElementById(videoID);
    let video =videoElement.getAttribute('video');
    if (video.paused)
        return;
    GLctx.bindTexture(GLctx.TEXTURE_2D, GL.textures[tex]);
    GLctx.texImage2D(GLctx.TEXTURE_2D, 0, GLctx.RGBA, GLctx.RGBA, GLctx.UNSIGNED_BYTE, $(videoID).get(0));
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