# Customer backend API

## Purpose
This API is a REST webservice intended for the customer to create and destroy VMRs (Virtual Meetng Rooms).
There is also a swagger definition available which can be found [here](backend_swagger.yml).


## Required data for Access
To be able to use the API you need:
- your Customer ID
- an API key

This information is used to authenticate your account.
The Customer ID and API key are provided to you by your VisionsConnected account manager.
Make sure to keep these values secret. Do not use them in front-end code or share them in code that is publicly accessible.

## API url
The API base url is https://engine.visionsconnected.com/video-engine/api/backend/v1

## Authentication
All requests to the API must be authenticated using HTTP Basic Authentication.
Provide your Customer ID as the basic auth username value and the API key as password.

## API Endpoints overview
The following endpoints are available:
- create a VMR
- delete a VMR
- get VMR state

## Api details
---

Name | Create VMR
---- | ---
purpose | Creates a virtual meeting room (VMR)
HTTP-method | POST
content-type | application/json
url | https://engine.visionsconnected.com/video-engine/api/backend/v1/vmrs

**response**
The response is a json structure like:
```
{
"reference": "ve-vevmr2",
"hostPIN": "5188",
"guestPIN": "5972",
"activeHosts": null,
"activeGuests": null
}
```

response fields
- Reference is an unique identifier for the created VMR. This reference can be distributed to the frontend application (either web or app) by any conceivable method (e-mail, HTTP, SMS, push, etc.).
- hostPIN and guestPIN are the codes used for the host and guests to log in to the VMR.
- actveHosts and activeGuests are not relevant in this response and always null or 0

If you have created the maximum number of VMR's for your account the response is http-code 422 and the following json body:
```
{
  "error": {
    "code": 0,
    "fields": null,
    "message": "NoVmrsAvailable : No vmrs available"
  }
}
```



---

Name | Delete VMR
---- | ---
purpose | Deletes the virtual meeting room (VMR) with specified Reference. Deleted VMR's can no longer be used or accessed through the API
HTTP-method | DELETE
content-type | application/json
url | https://engine.visionsconnected.com/video-engine/api/backend/v1/vmrs/{vmrReference}
parameters | {vmrReference} The reference returned by the Create VMR

**response**
There is no response body, the http code is 204.


---


Name | get VMR state
---- | ---
purpose | Retrieves the current state of a virtual meeting room (VMR)
HTTP-method | GET
content-type | application/json
url | https://engine.visionsconnected.com/video-engine/api/backend/v1/vmrs/{vmrReference}
parameters | {vmrReference} The reference returned by the Create VMR

**response**
If the VMR exists a http-code 200 is returned and a json structure like:
```
{
"reference": "ve-vevmr2",
"hostPIN": "5188",
"guestPIN": "5972",
"activeHosts": 1,
"activeGuests": null
}
```
response fields
- actveHosts and activeGuests are the number of participants currently in the room.

If the vmr does not exist a http-code 422 is returned and the following json body:
```
{
"error": {
"code": 0,
"fields": null,
"message": "Vmr not found"
}
```

