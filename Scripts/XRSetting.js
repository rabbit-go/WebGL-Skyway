function EnterXRSession() {
    navigator.xr.isSessionSupported('immersive-vr')
        .then((isSupported) => {
            if (isSupported) {
                document.body.isXR = true;
                document.getElementById("entervr").click();
                return;
            }
            else {
                navigator.xr.isSessionSupported('immersive-ar')
                    .then((isSupported2) => {
                        if (isSupported2) {
                            document.body.isXR = true;
                            document.getElementById("enterar").click();
                            return;
                        }
                    });
            }
        });
}
