# DEPENDENCIES
https = require('https')
fs = require('fs')
express = require('express')
cors = require('cors')

# SETUP EXPRESS
privateKey = fs.readFileSync('server.key', 'utf8')
certificate = fs.readFileSync('server.crt', 'utf8')

credentials =
  key: privateKey
  cert: certificate

app = express()
app.use cors()

app.use express.static('public')

httpsServer = https.createServer(credentials, app)

httpsServer.listen 8000, '0.0.0.0'

console.log("Server listening on port 8000!")
