function EnterXRSession() {
    navigator.xr.isSessionSupported('immersive-ar')
        .then((isSupported) => {
            if (isSupported) {
                document.body.isXR = true;
                unityInstance.Module.WebXR.toggleAR();
                return;
            }
            else {
                navigator.xr.isSessionSupported('immersive-vr')
                    .then((isSupported2) => {
                        if (isSupported2) {
                            document.body.isXR = true;
                            unityInstance.Module.WebXR.toggleVR();
                            return;
                        }
                    });
            }
        });
}
