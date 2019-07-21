const finalhandler = require('finalhandler')
const serveStatic = require('serve-static')

const { listBoards } = require('../controller/controller')
const { errorNotFound } = require('../util/response')

const router = require('find-my-way')({
  defaultRoute: (request, response) => {
    let responseBody = {}
    responseBody = {
      status: 'error',
      message: ''
    }
    errorNotFound(response, responseBody)
  }
})

router.on('GET', '/api/dashboard', (request, response) => {
  let responseBody = {}
  listBoards(response, responseBody)
})

router.on('GET', '/*.html', (request, response) => {
  let responseBody = {}
  const serve = serveStatic('/home/galiold/Projects/part-cadet/todo/lib/public/ftp', { index: ['dashboard.html', 'dashboard.htm'] })
  serve(request, response, finalhandler(request, response))
})

exports.router = router
