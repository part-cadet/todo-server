const finalhandler = require('finalhandler')
const serveStatic = require('serve-static')

const { listBoards } = require('../controller/controller')
// const { listTodoBoards } = require('../controller/controller')
const { listTodoBoards, addTodo, updateTodoBoard, removeTodoBoard, getTodoBoardId } = require('../controller/controller')

const { listBoards, listTasks, addTask, updateTask, removeTask ,getTaskById} = require('../controller/controller')


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
router.get('/api/tasks', listTasks)
router.get('/api/tasks/:taskID', getTaskById)
router.post('/api/tasks', addTask)
router.put('/api/tasks/:taskID', updateTask)
router.delete('/api/tasks/:taskID', removeTask)
router.get('/api/todo', listTodoBoards)
router.post('/api/todo', addTodo )
router.put('/api/todo/:todoBoardId', updateTodoBoard)
router.delete('/api/todo/:todoBoardId', removeTodoBoard)
router.get('/api/todo/:todoBoardId', getTodoBoardId)
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
