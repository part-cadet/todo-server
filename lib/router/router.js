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

router.get('/api/dashboard', listBoards)

router.get('/test', (request, response) => {
  const serve = serveStatic('/Users/Galiold/Projects/part-cadet/todo/lib/public/ftp', { index: ['dashboard.html', 'dashboard.htm'] })
  serve(request, response, finalhandler(request, response))
})

exports.router = router
