function soraSendDataChannelLoop(ang_str, lin_str) {
    let ang = parseFloat(ang_str);
    ang = 127 * ang;
    let lin = parseFloat(lin_str);
    lin = 127 * lin;
    let video = document.getElementById('RightEye-video-mobile');
    if (recvonlyR_mobile != null && video.srcObject != null){
        // let send_value = new Int16Array([((127*ang) << 8) & 0xff00; | (127*lin) & 0x00ff]);
   //     recvonlyR_mobile.sendMessage("#sora-devtools", new Uint8Array([0x43, 0x00, ang, lin]));
}
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
var twincam_setPos_count= 0;
var old_HMD_ang = 0;
var setPosA=0;
var setPos=0;
function SoraVRSendData(x, y, z,id) {
    let yVal = parseFloat(y);
    twincam_setPos_count+=6;
    let yValInteger = Math.trunc((yVal/180)*127);
    let video = document.getElementById('RightEye-video-mobile');
    let video2 = document.getElementById('RightEye-video');
    if (recvonlyR_mobile  != null && (video.srcObject != null || video2.srcObject !=null)){
        HMD_ang = (yVal/180)*700;
        if (Math.abs(HMD_ang) < 350) {
            setPosA = 0;
        }
        if (HMD_ang - old_HMD_ang < -700) {
            setPosA +=  1400;
        }
        else if (HMD_ang - old_HMD_ang > 700) {
            setPosA += -1400;
        }
        setPos = HMD_ang + setPosA;
        if (setPos > 1050) {
            setPos = 1050;
        }
        else if (setPos < -1050) {
            setPos = -1050;
        }
        old_HMD_ang = HMD_ang;
        let send_value = setPos;

        if (twincam_setPos_count > 15) {
            twincam_setPos_count = 0;
            //recvonlyR_mobile.sendMessage("#sora-devtools", new Uint8Array([0xe0, yValInteger]));
          //  recvonlyR_mobile.sendMessage("#sora-devtools", new Uint8Array([0xe0, yValInteger]));
          // recvonlyDataChannel.sendMessage('#sora-devtools', new Uint8Array([0xe0, new Uint16Array([send_value & 0xff00])[0] >> 8, send_value & 0x00ff]));
        }
    }
    }
       
