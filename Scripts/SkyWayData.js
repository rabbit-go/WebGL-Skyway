//初期化(cssでもできるはず)
var existingDataConn = null;
function DataConnect(theirId) {
    if(peer == null){
         peer = new Peer(theirId, {
            key: '829682c4-f853-4d97-8691-aa0c10064efd',    //APIkey
            debug: 3
        });
    }


    //接続
    const conn = peer.connect(theirId);
    existingDataConn = conn;
} 
function DataClose(theirId) {
    
}
//送信処理
function DataSend(msg) {
    existingDataConn.send(msg);
}
function DataReceived(){

}
