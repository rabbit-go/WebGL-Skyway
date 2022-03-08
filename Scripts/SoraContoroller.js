function soraSendDataChannelLoop(ang_str, lin_str) {
    let ang = parseFloat(ang_str);
    ang = 127 * ang;
    let lin = parseFloat(lin_str);
    lin = 127 * lin;
    let video = document.getElementById('LeftEye-video');
    if (recvonlyDataChannel != null && video.srcObject != null)
        // let send_value = new Int16Array([((127*ang) << 8) & 0xff00; | (127*lin) & 0x00ff]);
        recvonlyDataChannel.sendMessage("#sora-devtools", new Uint8Array[0x43, 0x00, ang, lin]);
}
