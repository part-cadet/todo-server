const http = require('http')
const { router } = require('../lib/router/router')
const server = http.createServer()

server.on('request', function (request, response) {
  router.lookup(request, response)
})

exports.server = server
