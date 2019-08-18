const finalhandler = require('finalhandler')
const serveStatic = require('serve-static')

const { listBoards, getBoardByID, addBoard, removeBoard, updateBoard, getTodosOfBoard, getOwnerOfBoard, getTasksOfBoard, getMembersOfBoard, addMember } = require('../controller/controller')

const { listTodoBoards, addTodo, updateTodoBoard, removeTodoBoard, getTodoBoardId, getTasksOfTodo } = require('../controller/controller')

const { listTasks, addTask, updateTask, removeTask, getTaskById } = require('../controller/controller')

const { authenticateUser } = require('../controller/controller')

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
/**
 * @swagger
 *
 * /api/tasks:
 *   get:
 *     tags:
 *      - Tasks
 *     summary: Get a list of current tasks
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: tasks Listed
 */
router.get('/api/tasks', listTasks)

/**
 * @swagger
 *
 * /api/tasks/{id}:
 *   get:
 *    tags:
 *      - Tasks
 *    summary: Returns the task requested by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The ID of the requested board
 *    produces:
 *       - application/json
 *    responses:
 *      200:
 *        description: Task Found
 *      404:
 *        description: Task Not Found
 */
router.get('/api/tasks/:taskID', getTaskById)

/**
 * @swagger
 *
 * /api/tasks/{todoID}:
 *  post:
 *    tags:
 *      - Tasks
 *    summary: Creates a new task.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: todoID
 *        required: true
 *        type: string
 *        description: The ID of the todo containing the task
 *      - in: body
 *        name: task info
 *        required: true
 *        description: The info required to create a task.
 *        schema:
 *          type: object
 *          required:
 *            - done
 *            - description
 *          properties:
 *            done:
 *              type: boolean
 *              example: false
 *            description:
 *              type: string
 *              example: task 1
 *    produces:
 *      - application/json
 *    responses:
 *      201:
 *        description: Created

 */
router.post('/api/tasks/:todoID', addTask)

// TODO: Fix issue, update can send one of status and description
/**
 * @swagger
 *
 * /api/tasks/{id}:
 *   put:
 *    tags:
 *      - Tasks
 *    summary: Updates a current task requested by id.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The ID of the requested board
 *      - in: body
 *        name: board info
 *        description: The info required to create a board.
 *        schema:
 *          type: object
 *          properties:
 *            done:
 *              type: boolean
 *              example: true
 *            description:
 *              type: string
 *    produces:
 *       - application/json
 *    responses:
 *      200:
 *        description: Task updated.
 *      400:
 *        description: Request body is not valid.
 *      404:
 *        description: The requested task was not found.
 *      500:
 *        description: Internal Server Error has occured while processing the request body.
 */
router.put('/api/tasks/:taskID', updateTask)

/**
 * @swagger
 *
 * /api/tasks/{id}:
 *   delete:
 *    tags:
 *      - Tasks
 *    summary: Deletes the task requested by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The ID of the requested board
 *    produces:
 *       - application/json
 *    responses:
 *      200:
 *        description: Task deleted.
 *      404:
 *        description: Task was not found.
 */
router.delete('/api/tasks/:taskID', removeTask)

// Todos APIs
/**
 * @swagger
 *
 * /api/todo:
 *   get:
 *     tags:
 *      - Todos
 *     summary: Get a list of current todos
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Todos Listed
 */
router.get('/api/todo', listTodoBoards)

/**
 * @swagger
 *
 * /api/todo/tasksof/{id}:
 *   get:
 *    tags:
 *      - Todos
 *    summary: Returns the tasks of the requested todo board
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The ID of the requested todo board
 *        example: "3"
 *    produces:
 *       - application/json
 *    responses:
 *      200:
 *        description: Tasks Found
 *      404:
 *        description: Todo Board Not Found
 */

router.get('/api/todo/tasksof/:todoID', getTasksOfTodo)

/**
 * @swagger
 *
 * /api/todo/{boardID}:
 *  post:
 *    tags:
 *      - Todos
 *    summary: Creates a new todo board.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: boardID
 *        required: true
 *        type: string
 *        format: string
 *        description: The ID of the todo containing the task
 *      - in: body
 *        name: todo info
 *        required: true
 *        description: The info required to create a todo board.
 *        schema:
 *          type: object
 *          required:
 *            - title
 *          properties:
 *            title:
 *              type: string
 *              example: Todo 1
 *    produces:
 *      - application/json
 *    responses:
 *      201:
 *        description: Created

 */
router.post('/api/todo/:boardID', addTodo)

/**
 * @swagger
 *
 * /api/todo/{id}:
 *   put:
 *    tags:
 *      - Todos
 *    summary: Updates a current todo board requested by id.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        format: string
 *        description: The ID of the requested todo board
 *      - in: body
 *        name: todo info
 *        description: The info required to create a todo board.
 *        schema:
 *          type: object
 *          properties:
 *             title:
 *              type: string
 *              example: Todo 1
 *    produces:
 *       - application/json
 *    responses:
 *      200:
 *        description: Todo board was found and updated.
 *      400:
 *        description: Request body is not valid.
 *      404:
 *        description: The requested Todo board was not found.
 *      500:
 *        description: Internal Server Error has occured while processing the request body.
 */
router.put('/api/todo/:todoID', updateTodoBoard)

/**
 * @swagger
 *
 * /api/todo/{id}:
 *   delete:
 *    tags:
 *      - Todos
 *    summary: Deletes the Todo board requested by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        format: string
 *        description: The ID of the requested Todo board
 *        example: "9516d24c-a13f-4d9c-bd15-c3ca44c16f61"
 *    produces:
 *       - application/json
 *    responses:
 *      200:
 *        description: Todo board found and deleted.
 *      404:
 *        description: Todo board was not found.
 */

router.delete('/api/todo/:todoID', removeTodoBoard)

/**
 * @swagger
 *
 * /api/todo/{id}:
 *   get:
 *    tags:
 *      - Todos
 *    summary: Returns the Todo board requested by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        format: string
 *        description: The ID of the requested board
 *    produces:
 *       - application/json
 *    responses:
 *      200:
 *        description: Todo board Found
 *      404:
 *        description: Todo board Not Found
 */
router.get('/api/todo/:todoID', getTodoBoardId)

// Boards APIs

/**
 * @swagger
 *
 * /api/boards:
 *   get:
 *     tags:
 *      - Boards
 *     summary: Get a list of current boards
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
 *    tags:
 *      - Boards
 *    summary: Returns the board requested by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The ID of the requested board
 *    produces:
 *       - application/json
 *    responses:
 *      200:
 *        description: Board Found
 *      404:
 *        description: Board Not Found
 */
router.get('/api/boards/:boardID', getBoardByID)

/**
 * @swagger
 *
 * /api/boards:
 *  post:
 *    tags:
 *      - Boards
 *    summary: Creates a new board.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: board info
 *        required: true
 *        description: The info required to create a board.
 *        schema:
 *          type: object
 *          required:
 *            - title
 *            - owner_name
 *          properties:
 *            title:
 *              type: string
 *              example: Board 1
 *            owner_name:
 *              type: string
 *              example: Ali Goldani
 *    produces:
 *      - application/json
 *    responses:
 *      201:
 *        description: Created
 */
router.post('/api/boards', addBoard)

/**
 * @swagger
 *
 * /api/boards/addmemberto/{boardID}:
 *  post:
 *    tags:
 *      - Boards
 *    summary: Adds a member to a board.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: boardID
 *        required: true
 *        description: The id of the board to which we are adding the member.
 *        schema:
 *          type: string
 *      - in: body
 *        name: board info
 *        required: true
 *        description: The info required to add a member to the board.
 *        schema:
 *          type: object
 *          required:
 *            - username
 *          properties:
 *            username:
 *              type: string
 *              example: Ali Goldani
 *    produces:
 *      - application/json
 *    responses:
 *      201:
 *        description: Created
 */
router.post('/api/boards/addmemberto/:boardID', addMember)

/**
 * @swagger
 *
 * /api/boards/todosof/{boardID}:
 *  get:
 *    tags:
 *      - Boards
 *    summary: Gets a list of todos in the board.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: boardID
 *        required: true
 *        description: The id of the board in which we are searching for todos.
 *        schema:
 *          type: string
 *    produces:
 *      - application/json
 *    responses:
 *      201:
 *        description: Created
 */
router.get('/api/boards/todosof/:boardID', getTodosOfBoard)

/**
 * @swagger
 *
 * /api/boards/ownerof/{boardID}:
 *  get:
 *    tags:
 *      - Boards
 *    summary: Gets the owner of the given board.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: boardID
 *        required: true
 *        description: The id of the board the owner of which we want to find.
 *        schema:
 *          type: string
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: Owner found.
 */
router.get('/api/boards/ownerof/:boardID', getOwnerOfBoard)

/**
 * @swagger
 *
 * /api/boards/tasksof/{boardID}:
 *  get:
 *    tags:
 *      - Boards
 *    summary: Gets a list of all the tasks in the board.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: boardID
 *        required: true
 *        description: The id of the board in which we are searching for tasks.
 *        schema:
 *          type: string
 *    produces:
 *      - application/json
 *    responses:
 *      201:
 *        description: Created
 */
router.get('/api/boards/tasksof/:boardID', getTasksOfBoard)

/**
 * @swagger
 *
 * /api/boards/membersof/{boardID}:
 *  get:
 *    tags:
 *      - Boards
 *    summary: Gets a list of members of the board.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: boardID
 *        required: true
 *        description: The id of the board of which we are searching for members.
 *        schema:
 *          type: string
 *    produces:
 *      - application/json
 *    responses:
 *      201:
 *        description: Created
 */
router.get('/api/boards/membersof/:boardID', getMembersOfBoard)

/**
 * @swagger
 *
 * /api/boards/{id}:
 *   put:
 *    tags:
 *      - Boards
 *    summary: Updates a current board requested by id.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The ID of the requested board
 *      - in: body
 *        name: board info
 *        description: The info required to update a board.
 *        schema:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *              example: Board 2
 *    produces:
 *       - application/json
 *    responses:
 *      200:
 *        description: Board was found and updated.
 *      400:
 *        description: Request body is not valid.
 *      404:
 *        description: The requested board was not found.
 *      500:
 *        description: Internal Server Error has occured while processing the request body.
 */
router.put('/api/boards/:boardID', updateBoard)

/**
 * @swagger
 *
 * /api/boards/{id}:
 *   delete:
 *    tags:
 *      - Boards
 *    summary: Deletes the board requested by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The ID of the requested board
 *    produces:
 *       - application/json
 *    responses:
 *      200:
 *        description: Board found and deleted.
 *      404:
 *        description: Board was not found.
 */
router.delete('/api/boards/:boardID', removeBoard)

router.post('/api/login', authenticateUser)

router.on('GET', '/*.html', (request, response) => {
  const serve = serveStatic('lib/public', { index: ['dashboard.html', 'dashboard.htm'] })
  serve(request, response, finalhandler(request, response))
})

exports.router = router
