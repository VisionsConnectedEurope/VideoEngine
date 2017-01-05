var videoEngine;

/* Configuration of the call
*
* vmrId: Id of the virtual meeting room (required)
* displayName: Display name of the user to be used in-call (required)
* pincode: Pincode of the VMR. (required)
*/
var callConfig = {
  vmrId: 've-ci1011380',
  displayName: 'Your display name',
  pincode: '3279'
}

/* Configuration of the call
*
* containerSelectorId: Document element where the video is placed.
* callbacks: Defines the functions are being called on certain callbacks. You don't have to specify all callbacks, but this is advisable. The following callbacks are possible:
*   onReady: The VideoEngine is ready and the user has a valid technology to use video.
*   connectFailed: An error occured in trying to connect. A message is provided.
*   noPlatform: The user has no valid technology to start a video. This should show a download page for JabberGuest (see VideoEngine sample-project)
*   onDisconnect: The call is finished by either the user or the server.
*   onConnect: Callback when the call is connected and video is displayed.
* debug: Debug mode. (default: false)
*/
var initiatorConfig = {
  containerSelectorId: 'video-engine',
  callbacks: {
    onReady: function() {
      $('#controls').show();
    },
    connectFailed: function(error) {
      alert('Oeps, something went wrong..')
      callEnded();
    },
    noPlatform: function(error) {
      $('#controls, .call-connecting').hide();
      $('#download-jabberguest').show();
    },
    onDisconnect: function(message) {
      callEnded();
    },
    onConnect: function(message) {
      onConnect();
    },
    onPincodeRequired: function(details) {
      alert('You are required to fill in a pincode: ' + details.pincode);
    }
  },
  debug: true
}


function callEnded() {
  $('#start-call, #controls').show();
  $('.call-connecting, #download-jabberguest').hide();
}

function onConnect() {
  $('.call-connecting').hide();
  }

function downloadJabberGuest(event) {
  videoEngine.downloadJabberGuest();
}



$(document).ready(function() {
  // Initiate the video engine
  videoEngine = new VideoEngine(initiatorConfig);

  // Start calling
  $('#start-call').click(function() {
    $('#start-call').hide();
    $('.call-connecting').show();

    videoEngine.connect(callConfig);
  })

  $('#download-jabberguest, #jabberguest-icon').click(function(evt) {
    downloadJabberGuest(evt);
  });

  // Cancel/end call
  $('#cancel-call').click(function() {
    $('#start-call, #controls').show();
    $('.call-connecting').hide();
    videoEngine.cancel();
  })
})
