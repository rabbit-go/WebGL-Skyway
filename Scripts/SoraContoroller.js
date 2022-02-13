function soraSendDataChannelLoop(ang_str, lin_str) {
    let ang = parseInt(ang_str);
    let lin = parseInt(lin_str);
    let video = document.getElementById('RightEye-video');
    if (recvonlyL != null && video.srcObject != null)
        // let send_value = new Int16Array([((127*ang) << 8) & 0xff00; | (127*lin) & 0x00ff]);
        recvonlyL.sendMessage("#sora-devtools", new Int32Array([0x43000000 | (((127 * ang) << 8) & 0x0000ff00) | ((127 * lin) & 0x000000ff)]));
}
