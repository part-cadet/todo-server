// const url = require('url')
// const querystring = require('querystring')
const AJV = require('ajv')
const getRawBody = require('raw-body')
const uuidv4 = require('uuid/v4')

const db = require('../database/database')
// const { Client } = require('pg')
// const dbClient = new Client({
//   user: 'cadet',
//   host: '192.168.4.179',
//   database: 'todo',
//   password: 'partintern',
//   port: 5432
// })
// dbClient.connect()

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
  db.getBoards()
    .then((result) => {
      ok(response, result)
    })
    .catch((err) => {
      error(response, err)
    })
}

exports.getBoardByID = (request, response, params) => {
  const valid = ajv.validate(schema.boardIDSchema, params)
  const validationError = ajv.errors
  if (valid) {
    db.findBoardByID(params.boardID)
      .then((result) => {
        if (result.length > 0) {
          const responseBody = {
            status: 'Ok',
            result: result
          }
          ok(response, responseBody)
        } else {
          const responseBody = {
            status: 'Not Found',
            message: 'Requested board was not found'
          }
          errorNotFound(response, responseBody)
        }
      })
      .catch((err) => {
        error(response, err)
      })
  } else {
    error(response, validationError)
  }
}

exports.getTodosOfBoard = (request, response, params) => {
  const valid = ajv.validate(schema.boardIDSchema, params)
  const validationError = ajv.errors
  if (valid) {
    db.getTodosOfBoard(params.boardID)
      .then((result) => {
        if (result.length > 0) {
          const responseBody = {
            status: 'Ok',
            result: result
          }
          ok(response, responseBody)
        } else {
          const responseBody = {
            status: 'Not Found',
            message: 'Requested board was not found'
          }
          errorNotFound(response, responseBody)
        }
      })
      .catch((err) => {
        error(response, err)
      })
  } else {
    error(response, validationError)
  }
}

exports.getOwnerOfBoard = (request, response, params) => {
  const valid = ajv.validate(schema.boardIDSchema, params)
  const validationError = ajv.errors
  if (valid) {
    db.getOwnerOfBoard(params.boardID)
      .then((result) => {
        if (result.length > 0) {
          const responseBody = {
            status: 'Ok',
            result: result
          }
          ok(response, responseBody)
        } else {
          const responseBody = {
            status: 'Not Found',
            message: 'Requested board was not found'
          }
          errorNotFound(response, responseBody)
        }
      })
      .catch((err) => {
        error(response, err)
      })
  } else {
    error(response, validationError)
  }
}

exports.getTasksOfBoard = (request, response, params) => {
  const valid = ajv.validate(schema.boardIDSchema, params)
  const validationError = ajv.errors
  if (valid) {
    db.getTasksOfBoard(params.boardID)
      .then((result) => {
        if (result.length > 0) {
          const responseBody = {
            status: 'Ok',
            result: result
          }
          ok(response, responseBody)
        } else {
          const responseBody = {
            status: 'Not Found',
            message: 'Requested board was not found'
          }
          errorNotFound(response, responseBody)
        }
      })
      .catch((err) => {
        error(response, err)
      })
  } else {
    error(response, validationError)
  }
}

exports.getMembersOfBoard = (request, response, params) => {
  const valid = ajv.validate(schema.boardIDSchema, params)
  const validationError = ajv.errors
  if (valid) {
    db.getMembersOfBoard(params.boardID)
      .then((result) => {
        if (result.length > 0) {
          const responseBody = {
            status: 'Ok',
            result: result
          }
          ok(response, responseBody)
        } else {
          const responseBody = {
            status: 'Not Found',
            message: 'Requested board was not found'
          }
          errorNotFound(response, responseBody)
        }
      })
      .catch((err) => {
        error(response, err)
      })
  } else {
    error(response, validationError)
  }
}

exports.addBoard = (request, response) => {
  getRawBody(request)
    .then((bodyBuffer) => {
      const body = JSON.parse(bodyBuffer.toString())
      const valid = ajv.validate(schema.boardSchema, body)
      const validationError = ajv.errors
      if (valid) {
        db.addBoard(body.title)
          .then((result) => {
            const responseBody = {
              status: 'Ok',
              message: 'New board added.'
            }
            ok(response, responseBody)
          })
          .catch((err) => {
            error(response, err)
          })
      } else {
        error(response, validationError)
      }
    }).catch((err) => {
      errorServerInternal(response, err)
    })
}

exports.updateBoard = (request, response, params) => {
  getRawBody(request)
    .then((bodyBuffer) => {
      const body = JSON.parse(bodyBuffer.toString())
      const idValid = ajv.validate(schema.boardIDSchema, params)
      const idValidationError = ajv.errors
      if (idValid) {
        const bodyValid = ajv.validate(schema.boardUpdateSchema, body)
        const bodyValidationError = ajv.errors

        if (bodyValid) {
          db.updateBoard(params.boardID, body)
            .then((result) => {
              if (result > 0) {
                const responseBody = {
                  status: 'Ok',
                  message: 'Board updated.'
                }
                ok(response, responseBody)
              } else {
                const responseBody = {
                  status: 'Error',
                  message: 'Board Not Found'
                }
                errorNotFound(response, responseBody)
              }
            })
            .catch((err) => {
              error(response, err)
            })
        } else {
          error(response, bodyValidationError)
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
    db.removeBoard(params.boardID)
      .then((result) => {
        if (result > 0) {
          const responseBody = {
            status: 'Ok',
            message: 'Board deleted.'
          }
          ok(response, responseBody)
        } else {
          const responseBody = {
            status: 'Error',
            message: 'Board Not Found'
          }
          errorNotFound(response, responseBody)
        }
      })
      .catch((err) => {
        error(response, err)
      })
  } else {
    error(response, validationError)
  }
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
      errorNotFound(response, responseBody)
    }
  } else {
    error(response, validatonError)
  }
}

exports.addTask = (requst, response, params) => {
  getRawBody(requst)
    .then((bodyBuffer) => {
      const body = JSON.parse(bodyBuffer.toString())
      const idValid = ajv.validate(schema.todoIdSchema, params)
      const idValidationError = ajv.errors

      if (idValid) {
        const bodyValid = ajv.validate(schema.tasksSchema, body)
        const bodyValidationError = ajv.errors
        if (bodyValid) {
          const task = {
            todoID: params.todoID,
            id: uuidv4(),
            ...body
          }
          tasksDB.insert(task)
          const responseBody = {
            status: 'ok',
            message: 'Task added'
          }
          created(response, responseBody)
        } else {
          error(response, bodyValidationError)
        }
      } else {
        error(response, idValidationError)
      }
    }).catch((err) => {
      console.log(err)
      errorServerInternal(response, err)
    })
}

exports.updateTask = (requst, response, params) => {
  const idValid = ajv.validate(schema.taskIdSchema, params)
  const idValidationError = ajv.errors
  if (idValid) {
    getRawBody(requst)
      .then((bodyBuffer) => {
        const body = JSON.parse(bodyBuffer.toString())
        const bodyValid = ajv.validate(schema.tasksUpdateSchema, body)
        const bodyValidationError = ajv.errors

        if (bodyValid) {
          let task = tasksDB.findOne({
            id: params.taskID
          })

          if (task) {
            task = {
              ...task,
              ...body
            }

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
            errorNotFound(response, responseBody)
          }
        } else {
          error(response, bodyValidationError)
        }
      }).catch((err) => {
        console.log(err)
        errorServerInternal(response, err)
      })
  } else {
    error(response, idValidationError)
  }
}

exports.removeTask = (requst, response, params) => {
  const valid = ajv.validate(schema.taskIdSchema, params)
  const validatonError = ajv.errors
  if (valid) {
    const book = tasksDB.findOne({
      id: params.taskID
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
  db.getTodoBoards()
    .then((result) => {
      ok(response, result)
    })
    .catch((err) => {
      error(response, err)
    })
}

exports.addTodo = (request, response, params) => {
  getRawBody(request)
    .then((bodyBuffer) => {
      const body = JSON.parse(bodyBuffer.toString())

      const validID = ajv.validate(schema.boardIDSchema, params)
      const IDValidationError = ajv.errors

      if (validID) {
        const validBody = ajv.validate(schema.todoSchema, body)
        const bodyValidationError = ajv.errors
        if (validBody) {
          db.addTodoBoard(body.title, params.boardID)
            .then((result) => {
              console.log(result)
              const responseBody = {
                status: 'Ok',
                message: 'New todo board added.'
              }
              ok(response, responseBody)
            })
            .catch((err) => {
              error(response, err)
            })
        } else {
          error(response, bodyValidationError)
        }
      } else {
        error(response, IDValidationError)
      }
    }).catch((err) => {
      errorServerInternal(response, err)
    })
}

// exports.addTodo = (request, response, params) => {
//   getRawBody(request)
//     .then((bodyBuffer) => {
//       const body = JSON.parse(bodyBuffer.toString())
//       const validId = ajv.validate(schema.boardIDSchema, params)
//       const idValidationError = ajv.errors
//       if (validId) {
//         const validBody = ajv.validate(schema.todoSchema, body)
//         const validatonError = ajv.errors
//         if (validBody) {
//           const todoBoard = {
//             boardID: params.boardID,
//             id: uuidv4(),
//             ...body
//           }
//           todosDB.insert(todoBoard)
//           const responseBody = {
//             status: 'ok',
//             message: 'todo board added'
//           }
//           ok(response, responseBody)
//         } else {
//           console.log('else error')
//           error(response, validatonError)
//         }
//       } else {
//         error(response, idValidationError)
//       }
//     }).catch((err) => {
//       console.log(err)
//       console.log('catch err')

//       error(response, err)
//     })
// }

exports.updateTodoBoard = (request, response, params) => {
  getRawBody(request)
    .then((bodyBuffer) => {
      const body = JSON.parse(bodyBuffer.toString())
      const idValid = ajv.validate(schema.todoIDSchema, params)
      const idValidationError = ajv.errors
      if (idValid) {
        const bodyValid = ajv.validate(schema.todoSchema, body)
        const bodyValidationError = ajv.errors

        if (bodyValid) {
          db.updateTodoBoard(params.todoID, body)
            .then((result) => {
              if (result > 0) {
                const responseBody = {
                  status: 'Ok',
                  message: 'Todo board updated.'
                }
                ok(response, responseBody)
              } else {
                const responseBody = {
                  status: 'Error',
                  message: 'Todo board Not Found'
                }
                errorNotFound(response, responseBody)
              }
            })
            .catch((err) => {
              error(response, err)
            })
        } else {
          error(response, bodyValidationError)
        }
      } else {
        error(response, idValidationError)
      }
    }).catch((err) => {
      errorServerInternal(response, err)
    })
}

// exports.updateTodoBoard = (requst, response, params) => {
//   const idValid = ajv.validate(schema.todoIdSchema, params)
//   const idValidationError = ajv.errors
//   if (idValid) {
//     getRawBody(requst)
//       .then((bodyBuffer) => {
//         const body = JSON.parse(bodyBuffer.toString())
//         const bodyValid = ajv.validate(schema.todoSchema, body)
//         const bodyValidatonError = ajv.errors
//         if (bodyValid) {
//           let todoBoard = todosDB.findOne({
//             id: params.todoBoardId
//           })

//           if (todoBoard) {
//             todoBoard = {
//               ...todoBoard,
//               ...body
//             }

//             todosDB.update(todoBoard)
//             const responseBody = {
//               status: 'ok',
//               message: 'todo board updated'
//             }
//             ok(response, responseBody)
//           } else {
//             const responseBody = {
//               status: 'Not Found',
//               message: 'Board Not Found'
//             }
//             errorNotFound(response, responseBody)
//           }
//         } else {
//           error(response, bodyValidatonError)
//         }
//       }).catch((err) => {
//         errorServerInternal(response, err)
//       })
//   } else {
//     error(response, idValidationError)
//   }
// }

exports.removeTodoBoard = (request, response, params) => {
  const valid = ajv.validate(schema.todoIDSchema, params)
  const validationError = ajv.errors
  if (valid) {
    db.removeTodoBoard(params.todoID)
      .then((result) => {
        if (result > 0) {
          const responseBody = {
            status: 'Ok',
            message: 'Todo Board deleted.'
          }
          ok(response, responseBody)
        } else {
          const responseBody = {
            status: 'Error',
            message: 'Todo Board Not Found'
          }
          errorNotFound(response, responseBody)
        }
      })
      .catch((err) => {
        error(response, err)
      })
  } else {
    error(response, validationError)
  }
}

// exports.removeTodoBoard = (requst, response, params) => {
//   const valid = ajv.validate(schema.todoIdSchema, params)
//   const validatonError = ajv.errors
//   if (valid) {
//     const todoBoard = todosDB.findOne({
//       id: params.todoID
//     })
//     if (todoBoard) {
//       todosDB.remove(todoBoard)
//       const responseBody = {
//         status: 'ok',
//         message: 'todo board deleted'
//       }
//       ok(response, responseBody)
//     } else {
//       const responseBody = {
//         status: 'Not found',
//         message: 'todo board not found'
//       }
//       errorNotFound(response, responseBody)
//     }
//   } else {
//     error(response, validatonError)
//   }
// }

exports.getTodoBoardId = (request, response, params) => {
  const valid = ajv.validate(schema.todoIDSchema, params)
  const validationError = ajv.errors
  if (valid) {
    db.findTodoBooardByID(params.todoID)
      .then((result) => {
        if (result.length > 0) {
          const responseBody = {
            status: 'Ok',
            result: result
          }
          ok(response, responseBody)
        } else {
          const responseBody = {
            status: 'Not Found',
            message: 'Requested Todo board was not found'
          }
          errorNotFound(response, responseBody)
        }
      })
      .catch((err) => {
        error(response, err)
      })
  } else {
    error(response, validationError)
  }
}
