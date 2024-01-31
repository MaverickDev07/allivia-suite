/* Server angular */
// ng  build --aot --prod --output-hashing none
const http = require('http')
const path = require('path')
const express = require('express')
const app = express(),
      publicDir = express.static( path.join(__dirname, 'dist/allivia-suite') )
app.use( publicDir )
app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, 'dist/allivia-suite/index.html'))
})
const server = http.createServer(app);
server.listen(3000)
console.log(`Server listening on 3000`)

