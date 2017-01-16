# Frontend

## Technologies
The VideoEngine will automatically determine the best technology to use in the browser for setting up the video connection. Several technologies are supported.

### Supported technologies
**JabberGuest by Cisco**  
Cisco is a well-known player in the video technology market. They have a lot of experience and have an optimized plugin that is available for many popular browsers.

**WebRTC**  
WebRTC is a free, open project that provides browsers and mobile applications with Real-Time Communications (RTC) capabilities via simple APIs (https://webrtc.org).
WebRTC does not require the installation of an additional plugin and is supported in Chrome and Firefox.

**Flash**  
Flash required a plugin to function and is available for most popular browsers. It is no longer an obvious choice, but sometimes it's needed as a fallback when users already have flash installed and the browser doesn't support WebRTC or JabberGuest.

### Limitations of supported technologies
**PIN required with JabberGuest**  
When a user enters a video room, the user needs to provide a pincode. When using WebRTC and Flash this requirement is automatically handled by the VideoEngine and users do not need to enter a pincode manually. This is not support by JabberGuest and for JabberGuest users need to manually enter a pincode to access the video room. 

**Styling not possible for JabberGuest**  
With WebRTC and Flash the user interface can be styled to match your specific needs. Unfortunately this is not possible for JabberGuest.
You can read more about styling in the section "styling".

## Requirements
**HTTPS**  
Browsers nowadays require https when a website is using webcam or microphone input from the user. For that reason, the VideoEngine also requires the use of https on your website, at least for the page where the video engine is included. In development you can use self-signed certificates and make use of openssl to get it working.

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

**NOTICE: Don't include the main.js in your asset pipeline, it can break!!!** Load the files directly from the visionsconnected domain to have the best compatibility.

Or you can checkout the [frontend sample project](https://github.com/VisionsConnectedEurope/VideoEngine/tree/master/frontend-sample-project)

## VideoEngine API
The VideoEngine has a set of configuration options and functions developers can use to customize video calling. They are described below.

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
