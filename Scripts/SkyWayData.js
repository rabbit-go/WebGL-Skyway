//初期化(cssでもできるはず)

function DataConnect(theirId) {
    if(peer == null){
        var peer = //peerオブジェクトの作成
        peer = new Peer(yourid, {
            key: '829682c4-f853-4d97-8691-aa0c10064efd',    //APIkey
            debug: 3
        });
    }


    //接続
    const conn = peer.connect(theirId);
   
}
function DataClose(theirId) {
    
}
//送信処理
function DataSend(msg) {
    existingConn.send(msg);
}
function DataReceived(){

}
