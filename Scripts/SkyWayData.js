//初期化(cssでもできるはず)
var existingDataConn = null;
let g_theirId =""  ;
function DataConnect(theirId) {
    g_theirId = theirId;
    if(peer == null){
         return;
    }
    //接続
    const conn = peer.connect(theirId);
    existingDataConn = conn;
} 
function DataClose(theirId) {
    
}
//送信処理
function DataSend(msg) {
    if(existingDataConn==null){
        DataConnect(g_theirId);
        if(existingDataConn==null)return;
    }
    existingDataConn.send(msg);
}
function DataReceived(){

}
