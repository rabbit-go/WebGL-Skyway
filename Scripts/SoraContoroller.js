function soraSendDataChannelLoop(ang_str, lin_str) {
    let ang = parseFloat(ang_str);
    ang = 127 * ang;
    let lin = parseFloat(lin_str);
    lin = 127 * lin;
    let video = document.getElementById('LeftEye-video');
    if (recvonlyDataChannel != null && video.srcObject != null)
        // let send_value = new Int16Array([((127*ang) << 8) & 0xff00; | (127*lin) & 0x00ff]);
        recvonlyDataChannel.sendMessage("#sora-devtools", new Uint8Array([0x43, 0x00, ang, lin]));
}

function SoraSendData(x, y, z,id) {
    let xVal = parseFloat(x);
    let yVal = parseFloat(y);
    let zVal = parseFloat(z);
    let json = JSON.stringify({x: xVal, y: yVal, z: zVal,name: id});
    let video = document.getElementById('LeftEye-video');
    if (recvonlyL  != null && video.srcObject != null)
        recvonlyL.sendMessage("#soraData", (new TextEncoder('utf-8')).encode(json));
}
function SoraVRSendData(x, y, z,id) {
    let yVal = parseFloat(y);
    let yValInteger = Math.trunc((yVal/180)*127);
    let video = document.getElementById('LeftEye-video');
    if (recvonlyR_mobile  != null && video.srcObject != null)
        recvonlyR_mobile.sendMessage("#sora-devtools", new Uint8Array([0xe0, yValInteger]));
}
