
EnterXRSession: function() {
    navigator.xr.isSessionSupported('immersive-vr')
        .then((isSupported) => {
            if (isSupported) {
                document.getElementById("entervr").click();
                return;
            }
            else {
                navigator.xr.isSessionSupported('immersive-ar')
                    .then((isSupported2) => {
                        if (isSupported2) {
                            document.getElementById("enterar").click();
                            return;
                        }
                    });
            }
        });
}
