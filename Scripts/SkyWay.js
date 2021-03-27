'use strict';
let peer = null;
let existingLeftCall = null;
let existingRightCall = null;
const receiveOnly = true;    //受信専用かどうか
const VIDEO_CODEC = 'VP9';

class ReturnValue {
    constructor(Value, MethodName) {
        this.Value = Value;
        this.MethodName = MethodName;
    }
}

//peeridを取得 
function GetPeerId(yourid) {
    //peerオブジェクトの作成
    peer = new Peer(yourid, {
        key: '829682c4-f853-4d97-8691-aa0c10064efd',    //APIkey
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
}
function GetPersonList() {
    var element = document.getElementById('name-list');
    element.innerText = "";
    existingRightCall.members.forEach(menber => {
        element.innerText += menber + '\n';
    });
}

function MakeCallLeft(calltoid) {
    let call = MakeCall(calltoid);
    if (existingLeftCall) {
        existingLeftCall.close();
    };
    existingLeftCall = call;
    CallEventSubscribe('LeftEye-video', call);

}
function MakeCallRight(calltoid) {
    let call = MakeCall(calltoid);
    if (existingRightCall) {
        existingRightCall.close();
    };
    existingRightCall = call;
    CallEventSubscribe('RightEye-video', call);
}

//切断処理
function EndCall() {
    if (existingLeftCall) existingLeftCall.close();
    if (existingRightCall) existingRightCall.close();
}
//発信処理
function MakeCall(calltoid) {
    let localStream = null;
    const room = peer.joinRoom(calltoid, {
        mode: "sfu",
        stream: localStream,
        videoCodec: VIDEO_CODEC,
        videoReceiveEnabled: receiveOnly,                 //受信専用としてここで設定
        audioReceiveEnabled: receiveOnly,
    });
    return room;
}
function CallEventSubscribe(id, call) {
    call.on('stream', function (stream) {
        let video = document.getElementById(id);
        video.srcObject = stream;
    });

    call.on('close', function () {    //??なぜか実行された側で発火せず??
        let video = document.getElementById(id);
        video.srcObject = undefined;
    });
}
//送信処理
function DataSend(msg) {
    existingRightCall.send(msg);
}
var gameObjectsName = [];
var methodsName = [];

//受信処理
function DataRecieve(data) {
    for (let index = 0; index < gameObjectsName.length; index++) {
        const gameObjectName = gameObjectsName[index];
        const methodName = methodsName[index];
        var value = new ReturnValue(data, methodName);
        var json = JSON.stringify(value);
        unityInstance.SendMessage(gameObjectName, "CallBack", json);
    }
}

// Unityと連携するための関数群
let hoge = function () {
    return {
        // Unityからのメッセージを受け取るハンドラ登録
        InitializationEventListener: function () {
            window.addEventListener('message', function (event) {
                hoge.ExecuteJs(event.data);
                hoge.RegisterJS(event.data);
            }, false);
        },
        // 受け取ったメッセージから、evalを使って関数を呼び出す
        ExecuteJs: function (message) {
            if (typeof (message) !== "string" && !(message instanceof String) || message == "null") {
                return;
            }
            var parameterObject = JSON.parse(message);
            var methodName = parameterObject.MethodName;
            var arg = parameterObject.Arg;
            var gameObjectName = parameterObject.GameObject;
            if (!(gameObjectName == undefined || gameObjectName == "")) {
                return;
            }
            if (arg == undefined) {
                arg = "";
            }
            var evalString = methodName + '(' + arg + ')';
            eval(evalString);
        },
        // 受け取ったメッセージから、evalを使って関数を呼び出す
        RegisterJS: function (message) {
            if (typeof (message) !== "string" && !(message instanceof String) || message == "null") {
                return;
            }
            var parameterObject = JSON.parse(message);
            var methodName = parameterObject.MethodName;
            var gameObjectName = parameterObject.GameObject;
            if ((gameObjectName == undefined || gameObjectName == "")) {
                return;
            }
            methodsName.push(methodName);
            gameObjectsName.push(gameObjectName);
        }
    };
}();
hoge.InitializationEventListener();
