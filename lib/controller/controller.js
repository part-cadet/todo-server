// const url = require('url')
// const querystring = require('querystring')

const AJV = require('ajv')
const getRawBody = require('raw-body')
const uuidv4 = require ('uuid/v4')

const schema= require('../schema/schema')
const { error, ok } = require('../util/response')
const { boardsDB, todosDB, tasksDB } = require('../database/database')

const ajv= new AJV({
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


exports.listTodoBoards = ( request, response) => {
const todoBoards = todosDB.find()
const responseBody = {

  status : 'ok',
  
  result: todoBoards
}

ok (response, responseBody)
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
        ok(response, {})
      } else {
        console.log("else error")
        error(response, validatonError)
      }
    }).catch((err) => {
      console.log(err)
      console.log("catch err")
      
      error(response, err)
    })
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
