const url = require('url')
// const querystring = require('querystring')
const AJV = require('ajv')
const getRawBody = require('raw-body')
const uuidv4 = require('uuid/v4')

const schema = require('../schema/schema')
const {
  error,
  errorNotFound,
  errorServerInternal,
  ok,
  created
} = require('../util/response')
const {
  boardsDB,
  todosDB,
  tasksDB
} = require('../database/database')

const ajv = new AJV({
  allErrors: true
})

exports.listBoards = (request, response) => {
  const boards = boardsDB.find()
  const responseBody = {
    status: 'ok',
    result: boards
  }
  ok(response, responseBody)
}

exports.addBoard = (request, response) => {
  getRawBody(request)
    .then((bodyBuffer) => {
      const body = JSON.parse(bodyBuffer.toString())
      const valid = ajv.validate(schema.boardSchema, body)
      const validationError = ajv.errors
      if (valid) {
        const board = {
          boardID: uuidv4(),
          ...body
        }
        boardsDB.insert(board)
        const responseBody = {
          status: 'Created',
          result: board
        }
        created(response, responseBody)
      } else {
        error(response, validationError)
      }
    }).catch((err) => {
      // console.log(err)
      errorServerInternal(response, err)
    })
}
exports.listTasks = (request, response) => {
  const tasks = tasksDB.find()

  const responseBody = {
    status: 'ok',
    result: tasks
  }

  ok(response, responseBody)
}

exports.getTaskById = (requst, response, params) => {
  const valid = ajv.validate(schema.taskIdSchema, params)
  const validatonError = ajv.errors
  if (valid) {
    const task = tasksDB.findOne({
      id: params.taskID
    })
    if (task) {
      ok(response, task)
    } else {
      const responseBody = {
        status: 'Not Found',
        message: 'Requested task was not found'
      }
      error(response, responseBody)
    }
  } else {
    error(response, validatonError)
  }
}

exports.addTask = (requst, response) => {
  console.log('add')
  getRawBody(requst)
    .then((bodyBuffer) => {
      const body = JSON.parse(bodyBuffer.toString())

      const valid = ajv.validate(schema.tasksSchema, body)
      const validatonError = ajv.errors
      if (valid) {
        const task = {
          id: uuidv4(),
          ...body
        }
        tasksDB.insert(task)
        const responseBody = {
          status: 'ok',
          message: 'Task added'
        }
        ok(response, responseBody)
      } else {
        error(response, validatonError)
      }
    }).catch((err) => {
      error(response, err)
    })
}

exports.updateTask = (requst, response, params) => {
  console.log('here')
  getRawBody(requst)
    .then((bodyBuffer) => {
      const body = JSON.parse(bodyBuffer.toString())

      const valid = ajv.validate(schema.tasksSchema, body)
      const validatonError = ajv.errors
      if (valid) {
        console.log('valid')
        let task = tasksDB.findOne({
          id: params.taskID

        })

        if (task) {
          task = { ...task, ...body }

          tasksDB.update(task)
          const responseBody = {
            status: 'ok',
            message: 'Task updated'
          }

          ok(response, responseBody)
        } else {
          const responseBody = {
            status: 'Not Found',
            message: 'Requested task was not found'
          }
          error(response, responseBody)
        }
      } else {
        console.log('sec err')
        error(response, validatonError)
      }
    }).catch((err) => {
      console.log('catch err')
      error(response, err)
    })
}

exports.removeTask = (requst, response, params) => {
  const valid = ajv.validate(schema.taskIdSchema, params)
  const validatonError = ajv.errors
  if (valid) {
    const book = tasksDB.findOne({
      id: params.taskId
    })
    if (book) {
      tasksDB.remove(book)
      const responseBody = {
        status: 'ok',
        message: 'Task deleted'
      }
      ok(response, responseBody)
    } else {
      const responseBody = {
        status: 'Not Found',
        message: 'Requested task was not found'
      }

      error(response, responseBody)
    }
  } else {
    error(response, validatonError)
  }
}

exports.listTodoBoards = (request, response) => {
  const todoBoards = todosDB.find()
  const responseBody = {

    status: 'ok',

    result: todoBoards
  }

  ok(response, responseBody)
}

exports.addTodo = (request, response) => {
  getRawBody(request)
    .then((bodyBuffer) => {
      const body = JSON.parse(bodyBuffer.toString())

      const valid = ajv.validate(schema.todoSchema, body)
      const validatonError = ajv.errors
      if (valid) {
        const todoBoard = {
          id: uuidv4(),
          ...body
        }
        todosDB.insert(todoBoard)
        const responseBody = {
          status: 'ok',
          message: 'todo board added'
        }
        ok(response, responseBody)
      } else {
        console.log('else error')
        error(response, validatonError)
      }
    }).catch((err) => {
      console.log(err)
      console.log('catch err')

      error(response, err)
    })
}

exports.updateTodoBoard = (requst, response, params) => {
  getRawBody(requst)
    .then((bodyBuffer) => {
      const body = JSON.parse(bodyBuffer.toString())

      const valid = ajv.validate(schema.todoSchema, body)
      const validatonError = ajv.errors
      if (valid) {
        let todoBoard = todosDB.findOne({
          id: params.todoBoardId
        })

        if (todoBoard) {
          todoBoard = { ...todoBoard, ...body }

          todosDB.update(todoBoard)
          const responseBody = {
            status: 'ok',
            message: 'todo board updated'
          }
          ok(response, responseBody)
        } else {
          const responseBody = {
            status: 'Not found',
            message: 'Request todo not found'
          }
          error(response, responseBody)
        }
      } else {
        error(response, validatonError)
      }
    }).catch((err) => {
      error(response, err)
    })
}

exports.removeTodoBoard = (requst, response, params) => {
  const valid = ajv.validate(schema.todoIdSchema, params)
  const validatonError = ajv.errors
  if (valid) {
    const todoBoard = todosDB.findOne({
      id: params.todoBoardId
    })
    if (todoBoard) {
      todosDB.remove(todoBoard)
      const responseBody = {
        status: 'ok',
        message: 'todo board deleted'
      }
      ok(response, responseBody)
    } else {
      const responseBody = {
        status: 'Not found',
        message: 'todo board not found'
      }
      error(response, responseBody)
    }
  } else {
    error(response, validatonError)
  }
}

exports.getTodoBoardId = (requst, response, params) => {
  const valid = ajv.validate(schema.todoIdSchema, params)
  const validatonError = ajv.errors
  if (valid) {
    const todoBoard = todosDB.findOne({
      id: params.todoBoardId
    })
    if (todoBoard) {
      ok(response, todoBoard)
    } else {
      const responseBody = {
        status: 'Not found',
        message: 'todo board not found'
      }
      error(response, responseBody)
    }
  } else {
    error(response, validatonError)
  }
}

// exports.addTodo=( request, response)=>{
//    getRawBody(request).then((bodyBuffer)=>{
//      const body = JSON.parse(bodyBuffer.toString())
//      const valid = ajv.validate(schema.todoBoardsSchema,body)
//      const validationError = ajv.errors

//      if (valid){
//        const todoBoard ={
//          id: uuidv4(),
//          ...body
//        }

//        todosDB.insert(todoBoard)
//        ok(response, {})

//      }

//      else {
//       error(response, validationError)
//     }

//    }).catch((error) => {
//     error(response, error)
//   })
// }

// function loadBoards () {
//   try {
//     const dataBuffer = fs.readFileSync('/Users/Galiold/Projects/part-cadet/todo/lib/Models/boards.json')
//     const dataJSON = dataBuffer.toString()
//     return JSON.parse(dataJSON)
//   } catch (err) {
//     return []
//   }
// }

exports.getBoardByID = (request, response, params) => {
  const valid = ajv.validate(schema.boardIDSchema, params)
  const validationError = ajv.errors
  if (valid) {
    const board = boardsDB.findOne({
      boardID: params.boardID
    })
    if (board) {
      const responseBody = {
        status: 'OK',
        result: board
      }
      ok(response, responseBody)
    } else {
      const responseBody = {
        status: 'Not Found',
        message: 'Requested board was not found'
      }
      errorNotFound(response, responseBody)
    }
  } else {
    error(response, validationError)
  }
}

exports.updateBoard = (request, response, params) => {
  getRawBody(request)
    .then((bodyBuffer) => {
      const body = JSON.parse(bodyBuffer.toString())
      const idValid = ajv.validate(schema.boardIDSchema, params)
      const idValidationError = ajv.errors
      const bodyValid = ajv.validate(schema.boardUpdateSchema, body)
      const bodyValidationError = ajv.errors
      if (idValid) {
        let board = boardsDB.findOne({
          boardID: params.boardID
        })
        if (board) {
          if (bodyValid) {
            board = { ...board, ...body }
            boardsDB.update(board)
            const responseBody = {
              status: 'OK',
              message: 'Requested board was updated'
            }
            ok(response, responseBody)
          } else {
            error(response, bodyValidationError)
          }
        } else {
          const responseBody = {
            status: 'Not Found',
            message: 'Requested board was not found'
          }
          errorNotFound(response, responseBody)
        }
      } else {
        error(response, idValidationError)
      }
    }).catch((err) => {
      errorServerInternal(response, err)
    })
}

exports.removeBoard = (request, response, params) => {
  const valid = ajv.validate(schema.boardIDSchema, params)
  const validationError = ajv.errors
  if (valid) {
    const board = boardsDB.findOne({
      boardID: params.boardID
    })
    if (board) {
      boardsDB.remove(board)
      const responseBody = {
        status: 'Ok',
        message: 'Requested board was removed'
      }
      ok(response, responseBody)
    } else {
      const responseBody = {
        status: 'Not Found',
        message: 'Requested board was not found'
      }
      errorNotFound(response, responseBody)
    }
  } else {
    error(response, validationError)
  }
}
