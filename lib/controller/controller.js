const AJV = require('ajv')
const getRawBody = require('raw-body')

const db = require('../database/database')

const auth = require('../auth/auth')

const schema = require('../schema/schema')
const {
  error,
  errorNotFound,
  errorServerInternal,
  ok,
  created,
  tokenExpired
} = require('../util/response')

const ajv = new AJV({
  allErrors: true
})

exports.listBoards = (request, response) => {
  const validToken = auth.hasAccess(request)
  console.log(validToken)

  if (validToken.verify) {
    // console.log(`User ${validToken.payload.username} logged in successfuly, token expires in ${validToken.payload.exp - validToken.payload.iat} seconds.`)
    db.getBoards(validToken.payload.username)
      .then((result) => {
        ok(response, result)
      })
      .catch((err) => {
        error(response, err)
      })
  } else {
    const responseBody = {
      status: 'Unauthorized Access',
      message: 'Token Expired'
    }
    tokenExpired(response, responseBody)
  }
}

exports.getBoardByID = (request, response, params) => {
  const validToken = auth.hasAccess(request)
  // console.log(validToken)

  if (validToken.verify) {
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
  } else {
    const responseBody = {
      status: 'Unauthorized Access',
      message: 'Token Expired'
    }
    tokenExpired(response, responseBody)
  }
}

exports.getTodosOfBoard = (request, response, params) => {
  const validToken = auth.hasAccess(request)
  // console.log(validToken)

  if (validToken.verify) {
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
  } else {
    const responseBody = {
      status: 'Unauthorized Access',
      message: 'Token Expired'
    }
    tokenExpired(response, responseBody)
  }
}

exports.getOwnerOfBoard = (request, response, params) => {
  const validToken = auth.hasAccess(request)
  // console.log(validToken)

  if (validToken.verify) {
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
  } else {
    const responseBody = {
      status: 'Unauthorized Access',
      message: 'Token Expired'
    }
    tokenExpired(response, responseBody)
  }
}

exports.getTasksOfBoard = (request, response, params) => {
  const validToken = auth.hasAccess(request)
  // console.log(validToken)

  if (validToken.verify) {
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
  } else {
    const responseBody = {
      status: 'Unauthorized Access',
      message: 'Token Expired'
    }
    tokenExpired(response, responseBody)
  }
}

exports.getMembersOfBoard = (request, response, params) => {
  const validToken = auth.hasAccess(request)
  // console.log(validToken)

  if (validToken.verify) {
    const valid = ajv.validate(schema.boardIDSchema, params)
    const validationError = ajv.errors
    if (valid) {
      db.getMembersOfBoard(params.boardID)
        .then((result) => {
          // if (result.length > 0) {
          const responseBody = {
            status: 'Ok',
            result: result
          }
          ok(response, responseBody)
          // } else {
          //   const responseBody = {
          //     status: 'Not Found',
          //     message: 'Requested board was not found'
          //   }
          //   errorNotFound(response, responseBody)
          // }
        })
        .catch((err) => {
          error(response, err)
        })
    } else {
      error(response, validationError)
    }
  } else {
    const responseBody = {
      status: 'Unauthorized Access',
      message: 'Token Expired'
    }
    tokenExpired(response, responseBody)
  }
}

exports.addBoard = (request, response) => {
  const validToken = auth.hasAccess(request)
  // console.log(validToken)

  if (validToken.verify) {
    getRawBody(request)
      .then((bodyBuffer) => {
        const body = JSON.parse(bodyBuffer.toString())
        const valid = ajv.validate(schema.boardSchema, body)
        const validationError = ajv.errors
        if (valid) {
          db.addBoard(body)
            .then((result) => {
              const responseBody = {
                status: 'Ok',
                message: 'New board added.'
              }
              created(response, responseBody)
            })
            .catch((err) => {
              error(response, err)
            })
        } else {
          error(response, validationError)
        }
      }).catch((err) => {
        console.log(err)
        errorServerInternal(response, err)
      })
  } else {
    const responseBody = {
      status: 'Unauthorized Access',
      message: 'Token Expired'
    }
    tokenExpired(response, responseBody)
  }
}

exports.addMember = (request, response, params) => {
  const validToken = auth.hasAccess(request)
  // console.log(validToken)

  if (validToken.verify) {
    getRawBody(request)
      .then((bodyBuffer) => {
        const body = JSON.parse(bodyBuffer.toString())
        const idValid = ajv.validate(schema.boardIDSchema, params)
        const idValidationError = ajv.errors
        if (idValid) {
          const bodyValid = ajv.validate(schema.boardMemberSchema, body)
          const bodyValidationError = ajv.errors

          if (bodyValid) {
            db.addMember(params.boardID, body)
              .then((result) => {
                if (result > 0) {
                  const responseBody = {
                    status: 'Ok',
                    message: 'added member'
                  }
                  created(response, responseBody)
                } else {
                  const responseBody = {
                    status: 'Error',
                    message: 'Board Not Found'
                  }
                  errorNotFound(response, responseBody)
                }
              })
              .catch((err) => {
                console.log(err)

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
  } else {
    const responseBody = {
      status: 'Unauthorized Access',
      message: 'Token Expired'
    }
    tokenExpired(response, responseBody)
  }
}

// exports.addMember = (request, response, params) => {
//   getRawBody(request)
//     .then((bodyBuffer) => {
//       const body = JSON.parse(bodyBuffer.toString())
//       const idValid = ajv.validate(schema.boardIDSchema, params)
//       const idValidationError = ajv.errors
//       const valid = ajv.validate(schema.boardSchema, body)
//       const validationError = ajv.errors
//       if(idValid){
//       if (valid) {
//         db.addMember(params.boardID, body)
//           .then((result) => {
//             const responseBody = {
//               status: 'Ok',
//               message: 'New member added.'
//             }
//             ok(response, responseBody)
//           })
//           .catch((err) => {
//             error(response, err)
//           })
//       } else {
//         error(response, validationError)
//       }
//     }).catch((err) => {
//       console.log(err)

//       errorServerInternal(response, err)
//     })
// }

exports.updateBoard = (request, response, params) => {
  const validToken = auth.hasAccess(request)
  // console.log(validToken)

  if (validToken.verify) {
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
  } else {
    const responseBody = {
      status: 'Unauthorized Access',
      message: 'Token Expired'
    }
    tokenExpired(response, responseBody)
  }
}

exports.removeBoard = (request, response, params) => {
  const validToken = auth.hasAccess(request)
  // console.log(validToken)

  if (validToken.verify) {
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
  } else {
    const responseBody = {
      status: 'Unauthorized Access',
      message: 'Token Expired'
    }
    tokenExpired(response, responseBody)
  }
}

exports.listTasks = (request, response) => {
  const validToken = auth.hasAccess(request)

  if (validToken.verify) {
    db.getTasks()
      .then((result) => {
        ok(response, result)
      })
      .catch((err) => {
        error(response, err)
      })
  } else {
    const responseBody = {
      status: 'Unauthorized Access',
      message: 'Token Expired'
    }

    tokenExpired(response, responseBody)
  }
}

exports.getTaskById = (request, response, params) => {
  const validToken = auth.hasAccess(request)

  if (validToken.verify) {
    const valid = ajv.validate(schema.taskIDSchema, params)
    const validationError = ajv.errors
    if (valid) {
      db.findTaskByID(params.taskID)
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
              message: 'Requested task was not found'
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
  } else {
    const responseBody = {
      status: 'Unauthorized Access',
      message: 'Token Expired'
    }

    tokenExpired(response, responseBody)
  }
}

exports.addTask = (request, response, params) => {
  const validToken = auth.hasAccess(request)

  if (validToken.verify) {
    getRawBody(request)
      .then((bodyBuffer) => {
        const body = JSON.parse(bodyBuffer.toString())

        const validID = ajv.validate(schema.todoIDSchema, params)
        const IDValidationError = ajv.errors

        if (validID) {
          const validBody = ajv.validate(schema.tasksSchema, body)
          const bodyValidationError = ajv.errors
          if (validBody) {
            db.addTask(body, params.todoID)
              .then((result) => {
                console.log(result)
                const responseBody = {
                  status: 'Ok',
                  message: 'New task board added.'
                }
                created(response, responseBody)
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
        console.log(err)

        errorServerInternal(response, err)
      })
  } else {
    const responseBody = {
      status: 'Unauthorized Access',
      message: 'Token Expired'
    }

    tokenExpired(response, responseBody)
  }
}

exports.updateTask = (request, response, params) => {
  const validToken = auth.hasAccess(request)

  if (validToken.verify) {
    getRawBody(request)
      .then((bodyBuffer) => {
        const body = JSON.parse(bodyBuffer.toString())
        const idValid = ajv.validate(schema.taskIDSchema, params)
        const idValidationError = ajv.errors
        if (idValid) {
          const bodyValid = ajv.validate(schema.tasksUpdateSchema, body)
          const bodyValidationError = ajv.errors
          // console.log(body)

          if (bodyValid) {
            db.updateTask(params.taskID, body)
              .then((result) => {
                if (result > 0) {
                  const responseBody = {
                    status: 'Ok',
                    message: 'Task updated.'
                  }
                  ok(response, responseBody)
                } else {
                  const responseBody = {
                    status: 'Error',
                    message: 'Task Not Found'
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
        console.log(err)
        errorServerInternal(response, err)
      })
  } else {
    const responseBody = {
      status: 'Unauthorized Access',
      message: 'Token Expired'
    }

    tokenExpired(response, responseBody)
  }
}

exports.removeTask = (request, response, params) => {
  const validToken = auth.hasAccess(request)
  if (validToken.verify) {
    const valid = ajv.validate(schema.taskIDSchema, params)
    const validationError = ajv.errors
    if (valid) {
      db.removeTask(params.taskID)
        .then((result) => {
          if (result > 0) {
            const responseBody = {
              status: 'Ok',
              message: 'Task deleted.'
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
  } else {
    const responseBody = {
      status: 'Unauthorized Access',
      message: 'Token Expired'
    }

    tokenExpired(response, responseBody)
  }
}

exports.getAssigneeOfTask = (request, response, params) => {
  const validToken = auth.hasAccess(request)
  // console.log(validToken)

  if (validToken.verify) {
    const valid = ajv.validate(schema.memberIdSchema, params)
    const validationError = ajv.errors
    if (valid) {
      db.getAssigneeOfTask(params.memberID)
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
              message: 'Requested task was not found'
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
  } else {
    const responseBody = {
      status: 'Unauthorized Access',
      message: 'Token Expired'
    }

    tokenExpired(response, responseBody)
  }
}

exports.listTodoBoards = (request, response) => {
  const validToken = auth.hasAccess(request)
  // console.log(validToken)

  if (validToken.verify) {
    console.log(`User ${validToken.payload.username} logged in successfuly, token expires in 10 minutes.`)
    db.getTodoBoards()
      .then((result) => {
        ok(response, result)
      })
      .catch((err) => {
        error(response, err)
      })
  } else {
    const responseBody = {
      status: 'Unauthorized Access',
      message: 'Token Expired'
    }

    tokenExpired(response, responseBody)
  }
}

exports.getTasksOfTodo = (request, response, params) => {
  const validToken = auth.hasAccess(request)
  if (validToken.verify) {
    const valid = ajv.validate(schema.todoIDSchema, params)
    const validationError = ajv.errors
    if (valid) {
      db.getTaskOfTodo(params.todoID)
        .then((result) => {
          if (result.length > 0) {
            const responseBody = {
              status: 'Ok',
              message: 'Tasks Found.',
              result: result
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
  } else {
    const responseBody = {
      status: 'Unauthorized Access',
      message: 'Token Expired'
    }

    tokenExpired(response, responseBody)
  }
}

exports.addTodo = (request, response, params) => {
  const validToken = auth.hasAccess(request)
  if (validToken.verify) {
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
                created(response, responseBody)
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
        console.log(err)

        errorServerInternal(response, err)
      })
  } else {
    const responseBody = {
      status: 'Unauthorized Access',
      message: 'Token Expired'
    }

    tokenExpired(response, responseBody)
  }
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
  const validToken = auth.hasAccess(request)
  if (validToken.verify) {
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
  } else {
    const responseBody = {
      status: 'Unauthorized Access',
      message: 'Token Expired'
    }

    tokenExpired(response, responseBody)
  }
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
  const validToken = auth.hasAccess(request)
  if (validToken.verify) {
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
  } else {
    const responseBody = {
      status: 'Unauthorized Access',
      message: 'Token Expired'
    }

    tokenExpired(response, responseBody)
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
  const validToken = auth.hasAccess(request)
  if (validToken.verify) {
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
  } else {
    const responseBody = {
      status: 'Unauthorized Access',
      message: 'Token Expired'
    }

    tokenExpired(response, responseBody)
  }
}

exports.authenticateUser = (request, response) => {
  getRawBody(request)
    .then((bodyBuffer) => {
      const body = JSON.parse(bodyBuffer.toString())
      const valid = ajv.validate(schema.userLoginSchema, body)
      const validationError = ajv.errors

      if (valid) {
        db.findUser(body.username)
          .then((result) => {
            if (result.length > 0) {
              const user = result[0]
              if (auth.passVerified(body.password, user.salt, user.passwd)) {
                const token = auth.signToken({ username: body.username })
                const responseBody = {
                  status: 'Ok',
                  message: 'Login successful.',
                  token: token,
                  username: body.username
                }
                ok(response, responseBody)
              } else {
                error(response, {
                  message: 'Password Not Verified'
                })
              }
            } else {
              const responseBody = {
                status: 'Not Found',
                message: 'User not found.'
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
    }).catch((err) => {
      console.log(err)
      errorServerInternal(response, err)
    })
}

exports.addUser = (request, response) => {
  getRawBody(request)
    .then((bodyBuffer) => {
      const body = JSON.parse(bodyBuffer.toString())
      const valid = ajv.validate(schema.userLoginSchema, body)
      const validationError = ajv.errors
      if (valid) {
        const passwordValid = auth.PasswordPolicy.check(body.password)

        if (passwordValid) {
          const username = body.username
          const password = body.password

          const {
            salt,
            hashedPassword
          } = auth.createHash(password)

          console.log(hashedPassword)

          const user = {
            salt: salt,
            username: username,
            password: hashedPassword
          }

          db.addUser(user)
            .then((result) => {
              const responseBody = {
                status: 'Ok',
                message: 'New user added.'
              }
              created(response, responseBody)
            })
            .catch((err) => {
              error(response, err)
            })
        } else {
          console.log('password')
          error(response, auth.PasswordPolicy.missing(body.password))
        }
      } else {
        error(response, validationError)
      }
    }).catch((err) => {
      console.log(err)
      errorServerInternal(response, err)
    })
}

exports.removeMember = (request, response, params) => {
  const validToken = auth.hasAccess(request)
  if (validToken.verify) {
    const valid = ajv.validate(schema.memberRemoveSchema, params)
    const validationError = ajv.errors
    if (valid) {
      db.removeMember(params)
        .then((result) => {
          if (result > 0) {
            const responseBody = {
              status: 'Ok',
              message: 'Member deleted.'
            }
            ok(response, responseBody)
          } else {
            const responseBody = {
              status: 'Error',
              message: 'Member Not Found'
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
  } else {
    const responseBody = {
      status: 'Unauthorized Access',
      message: 'Token Expired'
    }
    tokenExpired(response, responseBody)
  }
}
exports.getUsers = (request, response) => {
  const validToken = auth.hasAccess(request)

  if (validToken.verify) {
    db.getUsers()
      .then((result) => {
        ok(response, result)
      })
      .catch((err) => {
        error(response, err)
      })
  } else {
    const responseBody = {
      status: 'Unauthorized Access',
      message: 'Token Expired'
    }

    tokenExpired(response, responseBody)
  }
}
