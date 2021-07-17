'use strict';
let AudioPeer = null;
var roomMode = 'mesh';
//peeridを取得 
function GetPeerId(yourid) {
    //peerオブジェクトの作成
    peer = new Peer(yourid, {
        key: '829682c4-f853-4d97-8691-aa0c10064efd',    //APIkey
        debug: 3
    });
}

async function MakeCallAudio(calltoid) {
    let stream = null;
    let room = MakeRoom(calltoid, stream);
    CallEventSubscribe(calltoid, room);
}


//発信処理
function MakeRoom(calltoid, localStream) {
    if (peer == null) {
        GetPeerId();
    }
    const room = peer.joinRoom(calltoid, {
        mode: roomMode,
        stream: localStream,
        videoCodec: VIDEO_CODEC,
        videoReceiveEnabled: receiveOnly,                 //受信専用としてここで設定
        videoBandWidth: 20000,
    });
    return room;
}
var streams = new Array(4);
function CallEventSubscribe(id, room) {

    room.on('stream', async stream => {
        //forward left back right
        stream.getTracks().forEach((track, index) => {
            const tmpStream = new MediaStream([track]);
            streams[index] = tmpStream;
        });
        Create4DirectionAudio(streams);
    });

    room.on('close', function () {
        if (!stream.peerId.includes('tc')) {
            let element = document.getElementById(stream.peerId + 'audio');
            element.remove();
        }
        let video = document.getElementById(id);
        video.srcObject = undefined;
    });
}
//切断処理
function EndCall() {
    if (AudioPeer) AudioPeer.close();
}
