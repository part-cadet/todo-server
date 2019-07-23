const finalhandler = require('finalhandler')
const serveStatic = require('serve-static')

const { listBoards, addBoard, getBoardByID, updateBoard, removeBoard } = require('../controller/controller')
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

router.get('/api/boards', listBoards)
router.get('/api/boards/:boardID', getBoardByID)
router.post('/api/boards', addBoard)
router.put('/api/boards/:boardID', updateBoard)
router.delete('/api/boards/:boardID', removeBoard)

router.get('/*.html', (request, response) => {
  const serve = serveStatic('lib/public/ftp', { index: ['dashboard.html', 'dashboard.htm'] })
  serve(request, response, finalhandler(request, response))
})

exports.router = router
