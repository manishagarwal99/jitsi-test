var apiObj = null;

function BindEvent() {
	$("#btnHangup").on("click", function () {
		apiObj.executeCommand("hangup");
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
		apiObj.executeCommand("toggleChat"); ///
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
			startAudioMuted: 0, // Every participant after the Nth will start audio muted.
			startVideoMuted: 0,
			startWithVideoMuted: true,
			startWithAudioMuted: true, // Start calls with audio muted.
			// Whether to use a welcome page or not. In case it's false a random room
			// will be joined when no room is specified.
			enableWelcomePage: false,
			prejoinPageEnabled: false,
			disableRemoteMute: true,
			disableRecordAudioNotification: true,
			remoteVideoMenu: {
				disableKick: true,
			},
			disableRecordAudioNotification: true,
			remoteVideoMenu: {
				disableKick: true,
			},
			fileRecordingsEnabled: true,
			dropbox: {
				appKey:
					"sl.AzNZvigeU1ZnaZHGDD0DQArOQoFutOEbPXiz0rpVnKM-58MwBnxEIqJJHdC_A1HsuhWeoc4FeJtG0MAknNFEhoEOMBsvc9g45fuAU87HqEuv4fqMX6YckYunXhxlbqjGP3Wqd3o",
			},
			localRecording: {
				enabled: true,
				format: "flac", // can replace with ‘wav’, ‘ogg’
			},
			fileRecordingsServiceEnabled: true,
			fileRecordingsServiceSharingEnabled: true,
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
			// // Options for the recording limit notification.
			// recordingLimit: {
			//
			//    // The recording limit in minutes. Note: This number appears in the notification text
			//    // but doesn't enforce the actual recording time limit. This should be configured in
			//    // jibri!
			//    limit: 60,
			//
			//    // The name of the app with unlimited recordings.
			//    appName: 'Unlimited recordings APP',
			//
			//    // The URL of the app with unlimited recordings.
			//    appURL: 'https://unlimited.recordings.app.com/'
			// },
			// Disables responsive tiles.
			// disableResponsiveTiles: false,

			// Hides lobby button
			// hideLobbyButton: false,
			// Require users to always specify a display name.
			// requireDisplayName: true,
			// Enabling the close page will ignore the welcome page redirection when
			// a call is hangup.
			// enableClosePage: false,
			// Default language for the user interface.
			// defaultLanguage: 'en',
			// Disables profile and the edit of all fields from the profile settings (display name and email)
			// disableProfile: false,
			// When enabled the password used for locking a room is restricted to up to the number of digits specified
			// roomPasswordNumberOfDigits: 10,
			// default: roomPasswordNumberOfDigits: false,
			// Enables calendar integration, depends on googleApiApplicationClientID
			// and microsoftApiApplicationClientID
			// enableCalendarIntegration: false,
			// When 'true', it shows an intermediate page before joining, where the user can configure their devices.
			// prejoinPageEnabled: false,
		},
		interfaceConfigOverwrite: {
			filmStripOnly: false,
			SHOW_JITSI_WATERMARK: false,
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
	});

	apiObj.executeCommand("subject", "New Room 2");
	// apiObj.executeCommand("overwriteConfig", {
	// 	disableRecordAudioNotification: true,
	// });
}
