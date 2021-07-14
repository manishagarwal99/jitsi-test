var apiObj = null;

function BindEvent() {
	$("#btnHangup").on("click", function () {
		apiObj.executeCommand("hangup");
		apiObj.dispose();
	});
	$("#btnCustomMic").on("click", function () {
		apiObj.executeCommand("toggleAudio");
	});
	$("#btnCustomCamera").on("click", function () {
		apiObj.executeCommand("toggleVideo");
	});
	$("#btnCustomTileView").on("click", function () {
		apiObj.executeCommand("toggleTileView");
	});
	$("#btnScreenShareCustom").on("click", function () {
		apiObj.executeCommand("toggleShareScreen");
	});

	$("#btnChatCustom").on("click", function () {
		apiObj.executeCommand("toggleChat");
	});
	$("#btnMuteEveryoneCustom").on("click", function () {
		apiObj.executeCommand("muteEveryone");
	});
	$("#btnStartRecordingCustom").on("click", function () {
		apiObj.executeCommand("startRecording", {
			mode: "file",
			dropboxToken:
				"9Fe8ursxaVUAAAAAAAAAAWCAMU81eFmwHTWCxuDzHQf6dE9vdslxF_fYdxyel2WG",
			//shouldShare: true, https://www.dropbox.com/home/Apps/jitsi-with-manish2/Recordings
		});
	});
	$("#btnStopRecordingCustom").on("click", function () {
		apiObj.executeCommand("stopRecording", "file");
	});
	$("#btnTest").on("click", function () {
		apiObj.executeCommand("toggleRaiseHand");
	});
	$("#btnTest2").on("click", function () {
		apiObj.executeCommand("toggleParticipantList");
	});
}

function StartMeeting(roomName, dispNme) {
	const domain = "meet.jit.si";

	//var roomName = 'newRoome_' + (new Date()).getTime();

	const options = {
		roomName: roomName,
		width: "100%",
		height: "100%",
		parentNode: document.querySelector("#jitsi-meet-conf-container"),
		DEFAULT_REMOTE_DISPLAY_NAME: "New User",
		userInfo: {
			displayName: dispNme,
		},
		configOverwrite: {
			doNotStoreRoom: true,
			startVideoMuted: 0,
			startWithVideoMuted: true,
			startWithAudioMuted: true,
			enableWelcomePage: false,
			prejoinPageEnabled: false,
			disableRemoteMute: true,
			disableRecordAudioNotification: true,
			remoteVideoMenu: {
				disableKick: true,
			},
			fileRecordingsEnabled: true,
			dropbox: {
				appKey: "6d898pbjj0wy2mv",
				redirectURI: "https://meet.jit.si/static/oauth.html",
			},
			// localRecording: {
			// 	enabled: true,
			// 	format: "flac", // can replace with ‘wav’, ‘ogg’
			// },
			fileRecordingsServiceEnabled: true,
			//fileRecordingsServiceSharingEnabled: true,
		},
		interfaceConfigOverwrite: {
			filmStripOnly: false,
			DEFAULT_LOGO_URL: "",
			JITSI_WATERMARK_LINK: "",
			BRAND_WATERMARK_LINK: "",
			SHOW_BRAND_WATERMARK: false,
			SHOW_JITSI_WATERMARK: false,
			SHOW_POWERED_BY: false,
			SHOW_WATERMARK_FOR_GUESTS: false,
			DEFAULT_REMOTE_DISPLAY_NAME: "New User",
			TOOLBAR_BUTTONS: [],
		},
		onload: function () {
			//alert('loaded');
			$("#joinMsg").hide();
			$("#container").show();
			$("#toolbox").show();
		},
	};
	apiObj = new JitsiMeetExternalAPI(domain, options);

	apiObj.addEventListeners({
		readyToClose: function () {
			//alert('going to close');
			$("#jitsi-meet-conf-container").empty();
			$("#toolbox").hide();
			$("#container").hide();
			$("#joinMsg").show().text("Meeting Ended");
		},
		audioMuteStatusChanged: function (data) {
			if (data.muted) $("#btnCustomMic").text("Unmute");
			else $("#btnCustomMic").text("Mute");
		},
		videoMuteStatusChanged: function (data) {
			if (data.muted) $("#btnCustomCamera").text("Start Cam");
			else $("#btnCustomCamera").text("Stop Cam");
		},
		tileViewChanged: function (data) {},
		screenSharingStatusChanged: function (data) {
			if (data.on) $("#btnScreenShareCustom").text("Stop Share");
			else $("#btnScreenShareCustom").text("Start Share");
		},
		participantJoined: function (data) {
			console.log("participantJoined", data);
		},
		participantLeft: function (data) {
			console.log("participantLeft", data);
		},
		raiseHandUpdated: function (data) {
			if (data.handRaised) $("#btnTest").text("Lower Hand");
			else $("#btnTest").text("Raise Hand");
		},
		showParticipantList: function (data) {
			console.log("MYDATA=", data);
			if (data.enabled) $("#btnTest2").text("Show");
			else $("#btnTest2").text("Hide");
		},
	});

	apiObj.executeCommand("subject", "New Room 2");
	// apiObj.executeCommand("overwriteConfig", {
	// 	disableRecordAudioNotification: true,
	// });

	// Local Recording
	//

	// localRecording: {
	// Enables local recording.
	// Additionally, 'localrecording' (all lowercase) needs to be added to
	// the `toolbarButtons`-array for the Local Recording button to show up
	// on the toolbar.
	//
	//     enabled: true,
	//

	// The recording format, can be one of 'ogg', 'flac' or 'wav'.
	//     format: 'flac'
	//

	// },
	// Recording

	// Whether to enable file recording or not.
	// fileRecordingsEnabled: false,
	// Enable the dropbox integration.
	// dropbox: {
	//     appKey: '<APP_KEY>' // Specify your app key here.
	//     // A URL to redirect the user to, after authenticating
	//     // by default uses:
	//     // 'https://jitsi-meet.example.com/static/oauth.html'
	//     redirectURI:
	//          'https://jitsi-meet.example.com/subfolder/static/oauth.html'
	// },
	// When integrations like dropbox are enabled only that will be shown,
	// by enabling fileRecordingsServiceEnabled, we show both the integrations
	// and the generic recording service (its configuration and storage type
	// depends on jibri configuration)
	// fileRecordingsServiceEnabled: false,
	// Whether to show the possibility to share file recording with other people
	// (e.g. meeting participants), based on the actual implementation
	// on the backend.
	// fileRecordingsServiceSharingEnabled: false,
}
