
//peeridを取得 
function GetPeerId(yourid) {
    //peerオブジェクトの作成
    peer = new Peer(yourid, {
        key: '829682c4-f853-4d97-8691-aa0c10064efd',    //APIkey
        debug: 3
    });


}

function UnityConnect(theirId) {
    //接続
    const conn = peer.connect(theirId);
    Connect(conn);
}

//送信処理
function DataSend(msg) {
    existingConn.send(msg);
}

//接続イベントの管理
function Connect(conn) {
    if (existingConn) {
        existingConn.close();
    }
    SetupEndConnUI();

    //接続相手を保持
    existingConn = conn;

    //接続が完了した場合のイベント
    conn.on('open', () => {
       // $('#connected-id').text(conn.remoteId);
    });

    //受信
    conn.on('data', data => {
        DataRecieve(data);
     //   $('#resultRecieve').text(data);
    });

    //相手が切断したとき
    conn.on('close', () => {
      //  $('#console').text(conn.remoteId + ' has left the chat');
     //   SetupMakeConnUI();
    });
}

