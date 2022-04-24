function EnterXRSession() {
    navigator.xr.isSessionSupported('immersive-ar')
        .then((isSupported) => {
            if (isSupported) {
                document.body.isXR = true;
                xrManager.toggleAr();
                return;
            }
            else {
                navigator.xr.isSessionSupported('immersive-vr')
                    .then((isSupported2) => {
                        if (isSupported2) {
                            document.body.isXR = true;
                            xrManager.toggleVr();
                            return;
                        }
                    });
            }
        });
}
