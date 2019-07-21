const http = require('http')
const router = require('./lib/router/router')
const server = http.createServer()
const PORT = 80

server.on('request', function (request, response) {
  router.lookup(request, response)
})

server.listen(PORT, () => {
  console.log('Listening on port ' + PORT + ' ...')
})
