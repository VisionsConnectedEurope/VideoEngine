## Sample Project
For your convinience, VisionsConnected provides you with a sample project to quickly get you up and running.

### Prequisites
This project requires:
* Nodejs (https://nodejs.org/en/)

### Getting Started
Have you checked the prerequisites?
```sh
git clone https://github.com/VisionsConnectedEurope/VideoEngine.git my-app
cd my-app/frontend-sample-project
npm install
npm start
```
The application is running on port 8000. You can navigate in your browser to https://localhost:8000 to view it. You need to accept the ssl certificate in your browser.

### What to do next?
Now that you have the application running with working video, here are some ideas to get you started in getting familiar with the VideoEngine.
- Update the callConfig in scripts.js to use the correct vmrId (you get this information when you create a room in the [Backend REST API](https://github.com/VisionsConnectedEurope/VideoEngine/blob/master/BACKEND.md) with the key "reference". This is the same as a vmrId)
- Update the callConfig in scripts.js to use a displayName.
- Turn on debugging to see what is happening (output in the javascript console)
- Update the styling to match your organisation's.
- Build it in your own application
