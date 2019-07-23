const finalhandler = require('finalhandler')
const serveStatic = require('serve-static')

const { listBoards, getBoardByID, addBoard, removeBoard, updateBoard } = require('../controller/controller')

const { listTodoBoards, addTodo, updateTodoBoard, removeTodoBoard, getTodoBoardId } = require('../controller/controller')

const { listTasks, addTask, updateTask, removeTask, getTaskById } = require('../controller/controller')

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

// Dashboard API
router.get('/api/dashboard', listBoards)

// Tasks APIs
router.get('/api/tasks', listTasks)
router.get('/api/tasks/:taskID', getTaskById)
router.post('/api/tasks', addTask)
router.put('/api/tasks/:taskID', updateTask)
router.delete('/api/tasks/:taskID', removeTask)

// Todos APIs
router.get('/api/todo', listTodoBoards)
router.post('/api/todo', addTodo)
router.put('/api/todo/:todoBoardId', updateTodoBoard)
router.delete('/api/todo/:todoBoardId', removeTodoBoard)
router.get('/api/todo/:todoBoardId', getTodoBoardId)

// Boards APIs
router.get('/api/boards', listBoards)
router.get('/api/boards/:boardID', getBoardByID)
router.post('/api/boards', addBoard)
router.put('/api/boards/:boardID', updateBoard)
router.delete('/api/boards/:boardID', removeBoard)

router.get('/*.html', (request, response) => {
  const serve = serveStatic('lib/public', { index: ['dashboard.html', 'dashboard.htm'] })
  serve(request, response, finalhandler(request, response))
})

exports.router = router
