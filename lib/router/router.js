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
      status: 'Not Found',
      message: 'Page was not found'
    }
    errorNotFound(response, responseBody)
  }
})

// Dashboard API

/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 */
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

/**
 * @swagger
 *
 * /api/boards:
 *   get:
 *     description: Get a list of current boards
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Boards Listed
 */
router.get('/api/boards', listBoards)

/**
 * @swagger
 *
 * /api/boards/{id}:
 *   get:
 *    description: Login to the application
 *    parameters:
*       - in: path
*         name: id
*         required: true
*         type: string
*         format: uuid
*         description: The ID of the requested board
 *    produces:
 *       - application/json
 *    responses:
 *      200:
 *        description: Board Found
 */
router.get('/api/boards/:boardID', getBoardByID)

router.post('/api/boards', addBoard)
router.put('/api/boards/:boardID', updateBoard)
router.delete('/api/boards/:boardID', removeBoard)

router.on('GET', '/*.html', (request, response) => {
  const serve = serveStatic('lib/public', { index: ['dashboard.html', 'dashboard.htm'] })
  serve(request, response, finalhandler(request, response))
})

exports.router = router
