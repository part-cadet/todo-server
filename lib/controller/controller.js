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


exports.listTasks = (request, response) => {
  const tasks = tasksDB.find()

  const responseBody = {
    status: 'ok',
    result: tasks
  }

  ok(response, responseBody)
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
        ok(response, {})
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

          ok(response, {})
        } else {
          error(response, {})
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
// function loadBoards () {
//   try {
//     const dataBuffer = fs.readFileSync('/Users/Galiold/Projects/part-cadet/todo/lib/Models/boards.json')
//     const dataJSON = dataBuffer.toString()
//     return JSON.parse(dataJSON)
//   } catch (err) {
//     return []
//   }
// }
