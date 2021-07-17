//初期化(cssでもできるはず)
var existingDataConn = null;
let g_theirId =""  ;
function DataConnect(theirId) {

} 
function DataClose(theirId) {
    
}
//送信処理
function DataSend(msg) {
    if(existingRightCall==null){
        DataConnect(g_theirId);
        if(existingRightCall==null)return;
    }
    existingRightCall.send(msg);
}
function DataReceived(){

}
