'use strict';

let localStream = null;
let peer = null;
let existingCall = null;
let isReceive = true;    //受信専用かどうか
const VIDEO_CODEC = 'VP9';

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
    const call = peer.call(calltoid, localStream, {     //空の動画を送る
        videoCodec: VIDEO_CODEC,                        //これを入れないと動画が再生できない
        videoReceiveEnabled: isReceive,                 //受信専用としてここで設定
        audioReceiveEnabled: isReceive,
    });
    setupCallEventHandlers(call);
}

//切断処理
function EndCall() {
    existingCall.close();
}

//Callオブジェクトに必要なイベント
function setupCallEventHandlers(call) {
    if (existingCall) {
        existingCall.close();
    };

    existingCall = call;

    call.on('stream', function (stream) {
        addVideo(call, stream);
    });

    call.on('close', function () {    //??なぜか実行された側で発火せず??
        removeVideo(call.remoteId);
    });
}

//video要素の再生
function addVideo(call, stream) {
    $('#their-video').get(0).srcObject = stream;
}

//video要素の削除
function removeVideo(peerId) {
    $('#their-video').get(0).srcObject = undefined;
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