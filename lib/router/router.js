const url = require('url')
var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')

const { listBoards } = require('../controller/controller')
const { error, error_NotFound } = require('../util/response')

exports.lookup = (request, response) => {
  const requestURL = url.parse(request.url)
  let responseBody = {}
  if (request.method === 'GET' && requestURL.pathname === '/api/dashboard') {
    listBoards(response)
  } else {
    const serve = serveStatic('/Users/Galiold/Projects/part-cadet/todo/lib/public/ftp', { index: ['dashboard.html', 'dashboard.htm'] })
    serve(request, response, finalhandler(request, response))

    // responseBody = {
    //   status: 'error',
    //   message: ''
    // }
    // error(response, responseBody)
  }
}
