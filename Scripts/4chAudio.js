
streamInit();
function streamInit() {
	var AudioContext = window.AudioContext || window.webkitAudioContext;
	document.audioContext = new AudioContext();

	setInterval(function () {
		if (document.audioContext.state === "suspended" || document.audioContext.state === "interrupted") {
			console.log("resuming audioContext. state: " + document.audioContext.state);
			document.audioContext.resume();
		}
	}, 500);
}

function startStream() {
	const peer = new Peer('client', { key: '829682c4-f853-4d97-8691-aa0c10064efd' });
	const streams = new Array(2);
	peer.on("open", x => {
		const roomLR = peer.joinRoom("micLR", { mode: "mesh", audioReceiveEnabled: true, videoReceiveEnabled: false, stream: null });
		const roomFB = peer.joinRoom("micFB", { mode: "mesh", audioReceiveEnabled: true, videoReceiveEnabled: false, stream: null });
		roomLR.on("stream", stream => {
			if (stream != null) {
				streams[0] = stream;
				GetUserMediaSuccessLR(stream);
			}
		});
		roomFB.on("stream", stream => {
			if (stream != null) {
				streams[1] = stream;
				GetUserMediaSuccessFB(stream);
			}
			
		});
	});
	
	
	function GetUserMediaSuccessLR(stream) {
		document.microphone_stream = document.audioContext.createMediaStreamSource(stream);
		document.script_processor_node = document.audioContext.createScriptProcessor(4096, 1, 1);
		document.script_processor_node.onaudioprocess = MicrophoneProcessLR;

		document.script_processor_node.connect(document.audioContext.destination);
		document.microphone_stream.connect(document.script_processor_node);

		document.isRecording = 1;

		console.log('record started');
	}
	function GetUserMediaSuccessFB(stream) {
		document.microphone_stream = document.audioContext.createMediaStreamSource(stream);
		document.script_processor_node = document.audioContext.createScriptProcessor(4096, 1, 1);
		document.script_processor_node.onaudioprocess = MicrophoneProcessFB;

		document.script_processor_node.connect(document.audioContext.destination);
		document.microphone_stream.connect(document.script_processor_node);

		document.isRecording = 1;

		console.log('record started');
	}
	function MicrophoneProcessLR(event) {
		if (event.inputBuffer.sampleRate === 48000) {
			var leftFloat32Array = event.inputBuffer.getChannelData(0);
			var stringArray = "";

			for (var i = 0; i < leftFloat32Array.length; i++) {
				stringArray = stringArray + leftFloat32Array[i];
				if (i < leftFloat32Array.length - 1) {
					stringArray = stringArray + ",";
				}
			}

			SendMessage('Speakers/SpeakerL', 'WriteBufferFromMicrophoneHandler', stringArray);
			var leftFloat32Array = event.inputBuffer.getChannelData(1);
			var stringArray = "";

			for (var i = 0; i < leftFloat32Array.length; i++) {
				stringArray = stringArray + leftFloat32Array[i];
				if (i < leftFloat32Array.length - 1) {
					stringArray = stringArray + ",";
				}
			}
			SendMessage('Speakers/SpeakerR', 'WriteBufferFromMicrophoneHandler', stringArray);
		} else {
			Resample(event.inputBuffer, document.microphoneFrequency);
		}
	}
	function MicrophoneProcessFB(event) {
		if (event.inputBuffer.sampleRate === 48000) {
			var leftFloat32Array = event.inputBuffer.getChannelData(0);
			var stringArray = "";

			for (var i = 0; i < leftFloat32Array.length; i++) {
				stringArray = stringArray + leftFloat32Array[i];
				if (i < leftFloat32Array.length - 1) {
					stringArray = stringArray + ",";
				}
			}

			SendMessage('Speakers/SpeakerL', 'WriteBufferFromMicrophoneHandler', stringArray);
			var leftFloat32Array = event.inputBuffer.getChannelData(1);
			var stringArray = "";

			for (var i = 0; i < leftFloat32Array.length; i++) {
				stringArray = stringArray + leftFloat32Array[i];
				if (i < leftFloat32Array.length - 1) {
					stringArray = stringArray + ",";
				}
			}
			SendMessage('Speakers/SpeakerR', 'WriteBufferFromMicrophoneHandler', stringArray);
		} else {
			Resample(event.inputBuffer, document.microphoneFrequency);
		}
	}

	function Resample(sourceAudioBuffer, TARGET_SAMPLE_RATE) {
		var OfflineAudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
		var offlineCtx = new OfflineAudioContext(sourceAudioBuffer.numberOfChannels, sourceAudioBuffer.duration * sourceAudioBuffer.numberOfChannels * TARGET_SAMPLE_RATE, TARGET_SAMPLE_RATE);
		var buffer = offlineCtx.createBuffer(sourceAudioBuffer.numberOfChannels, sourceAudioBuffer.length, sourceAudioBuffer.sampleRate);
		// Copy the source data into the offline AudioBuffer
		for (var channel = 0; channel < sourceAudioBuffer.numberOfChannels; channel++) {
			buffer.copyToChannel(sourceAudioBuffer.getChannelData(channel), channel);
		}
		// Play it from the beginning.
		var source = offlineCtx.createBufferSource();
		source.buffer = sourceAudioBuffer;
		source.connect(offlineCtx.destination);
		source.start(0);
		offlineCtx.oncomplete = function (e) {
			// `resampled` contains an AudioBuffer resampled at 16000Hz.
			// use resampled.getChannelData(x) to get an Float32Array for channel x.
			var resampled = e.renderedBuffer;
			var leftFloat32Array = resampled.getChannelData(0);
			// use this float32array to send the samples to the server or whatever
			var stringArray = "";

			for (var i = 0; i < leftFloat32Array.length; i++) {
				stringArray = stringArray + leftFloat32Array[i];
				if (i < leftFloat32Array.length - 1) {
					stringArray = stringArray + ",";
				}
			}

			SendMessage('[FG]Microphone', 'WriteBufferFromMicrophoneHandler', stringArray);
		}
		offlineCtx.startRendering();
	}
}

function endStream() {
	if (document.microphone_stream != undefined) {
		document.microphone_stream.disconnect(document.script_processor_node);
		document.script_processor_node.disconnect();
	}

	document.microphone_stream = null;
	document.script_processor_node = null;

	document.isRecording = 0;

	console.log('record ended');
}
function isRecording() {
	if (document.isRecording == undefined)
		document.isRecording = 0;
	return document.isRecording;
}
