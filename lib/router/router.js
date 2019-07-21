const url = require('url')

const { listBoards } = require('../controller/controller')
const { error } = require('../util/response')

exports.lookup = (request, response) => {
  const requestURL = url.parse(request.url)
  let responseBody = {}
  if (request.method === 'GET' && requestURL.pathname === '/api/dashboard') {
    listBoards(response)
  } else {
    responseBody = {
      status: 'error',
      message: ''
    }
    error(response, responseBody)
  }
}
