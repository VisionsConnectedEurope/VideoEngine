# VC VideoEngine
VisionsConnected focused on a solution that makes it easy for developers and end-users to setup a video conference. From that perspective the service VideoEngine was created with as little complexity as possible. As a developer you do not have to worry about different browsers and technologies. The VideoEngine works in all major browsers.

The VideoEngine service has two api's:
- Backend REST API: room and participant management
- Frontend JS API: makes a connection to the room

The backend REST API is described in the backend swagger spec. This file is only about the Frontend JS API.

## Technologies
The VideoEngine is flexible in using the technologies that the browser supports. It will choose according to the situation what technology will be preferable to set-up a video connection.

### Different technologies
**JabberGuest by Cisco**  
Cisco is a well-known player in the videotechnology market. They have a lot of experience and have a optimized plugin that is available for all popular browsers.

**WebRTC**  
WebRTC is a free, open project that provides browsers and mobile applications with Real-Time Communications (RTC) capabilities via simple APIs (https://webrtc.org).
Webrtc does not require the installation of an additional plugin and is supported in Chrome and Firefox.

**Flash**  
Story about Flash
Flash required a plugin to function and is available for all popular browsers. It isn't a populair choice, but sometimes its needed as a fallback when users already have flash installed and there browser doesn't support WebRTC.

### Impact

**PIN**
For JabberGuest the user also need to enter a PIN. For the other technologies (WebRTC and Flash) the VideoEngine handles the authentication.

**Interface**
The design of the technologies are not equal.
The WebRTC and Flash controls can be styled. Unfortunately this is not possible for JabberGuest.
You can read more about styling in the section "styling".

## Requirements
There is one requirement that your site or webapplication need to have. The VideoEngine works only on ```https```. Browsers nowadays require https when a website is using webcam or microphone input from the user. In development you can use self-signed certificates and make use of openssl to get it working.

## Supported browsers 24-11-2016
Chrome: 54
Firefox: 50
Safari: 10
IE: 10 and 11
Edge: 13

## Getting Started
Did you check the requirements?

To get started, simply add the following javascript and css to your page.
```html
<link rel="stylesheet" type="text/css" href="https://engine.visionsconnected.com/video-engine/styles/main.css">
<script src="https://engine.visionsconnected.com/video-engine/scripts/main.js"></script>
```

**NOTICE: Don't include the main.js in your asset pipeline, it can break!!!** Load the files from the visionsconnected domain to have the best compatibility.

Or you can checkout the **sample-project**.

## VideoEngine API
The VideoEngine has a set of configuration options and functions developer can use to start video calling. They are described below.

### Video Engine Configuration
The VideoEngine has two sets of configuration options. Initial configuration that is only required to be called once, and per-call configuration that changes with every call.

**Initial configuration**  
For the VideoEngine, some initial configuration is needed. The following items are allowed.
- **containerSelectorId:** Document id (without #) where the video is placed.
- **callbacks:** Defines the functions are being called on certain callbacks. You don't have to specify all callbacks, but this is advisable. The following callbacks are possible:
  - **onReady:** The VideoEngine is ready and the user has a valid technology to use video.
  - **connectFailed:** An error occured in trying to connect. A message is provided.
  - **noPlatform:** The user has no valid technology to start a video. This should show a download page for JabberGuest (see VideoEngine sample-project)
  - **onDisconnect:** The call is finished by either the user or the server.
  - **onConnect:** Callback when the call is connected and video is displayed.
  - **onPincodeRequired:** When the user must manually enter the PIN.
- **debug:** Debug mode. (default: false) When set to true, detailed information about the state of the VideoEngine and the video technologies plugins is logged to the browser console.
*/

*Example usage*
```javascript
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
  debug: false
}
```
**Per call configuration**  
Each call requires information the VideoEngine needs to make the call. The following fields are required:
- **destination:** Destination of the call, obtained from the backend (required)
- **displayName:** Display name of the user to be used in-call (required)

*Example usage*
```javascript
/* Configuration of the call
*
* vmrId: vmrId of the call, obtained from the backend (required)
* displayName: Display name of the user to be used in-call (required)
*/
var callConfig = {
  vmrId: 'IUHEGWUHUGHEUIHIUGEHIUHGUWEH',
  displayName: 'John doe',
  pincode: '1234'
}
```

### Video Engine Functionalities
**Initiate**  
If the ```initiatorConfig``` is set, the VideoEngine can be started by calling (make sure the ```containerSelectorId``` exists):
```javascript
var videoEngine = new VideoEngine(initiatorConfig);
```

**Start call**  
With the information provided in the ```callConfig```, the VideoEngine is able to start the call using:
```javascript
videoEngine.connect(callConfig);
```

**Cancel Call**  
While the VideoEngine is trying to make the call, you can cancel while the application is connecting. This is done using the following function.
```javascript
videoEngine.cancel();
```

**Download JabberGuest**  
If the user does not have any of the technologies that the application requires to send/receive video, the customer must be advised to install JabberGuest or upgrade to a more capable browser. An example of this page is found in the sample project. The VideoEngine handles the downloading of the plugin and can in initiated by calling:

```javascript
videoEngine.downloadJabberGuest();
```

## Styling
### Controls
It is possible to change the styling of the in-video icons for the VideoEngine when WebRTC or Flash is used. Unfortunately this is not possible for JabberGuest.

VideoEngine has the following icons:
- Audio mute/unmute
- Video on/off
- Selfview on/off
- Disconnect

Each of the icons has a class *.ve-control* and this can be used to override the default VideoEngine styling. In addition, each icon has an unique id to add specific styling.
| Name              | Id
| ----------------- |:-------------:|
| Audio mute/unmute | ve-audio-switch
| Video on/off      | ve-video-switch
| Selfview on/off   | ve-selfview-switch
| Disconnect        | ve-disconnect

*Example usage*
```css
/* Make all icons but disconnect white with darkgrey text */
.ve-controls > .ve-control:not(#ve-disconnect) {
  background: white;
  color: #333;
}

/* Change the opacity on hover */
.ve-controls > .ve-control:hover {
  opacity: 0.9;
}

/* Make the controls square */
.ve-controls > .ve-control {
  border-radius: 0;
}
```

## Sample Project
For your convinience, VisionsConnected provides you with a sample project to quickly get you up and running.

### Prequisites
This project requires:
* Nodejs (https://nodejs.org/en/)

### Getting Started
Have you checked the prerequisites?
```sh
git clone https://github.com/visionsconnected/video-engine.git my-app
cd my-app
npm install
npm start
```
The application is running on port 8000. You can navigate in your browser to https://localhost:8000 to view it.

### What to do next?
Now that you have the application running with working video, here are some ideas to get you started in getting familiar with the VideoEngine.
- Update the callConfig in scripts.js to use the correct vmrId and displayName.
- Turn on debugging to see what is happening.
- Update the styling to match your organisation's.
- Build it in your own application
