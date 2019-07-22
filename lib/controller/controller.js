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





// function loadBoards () {
//   try {
//     const dataBuffer = fs.readFileSync('/Users/Galiold/Projects/part-cadet/todo/lib/Models/boards.json')
//     const dataJSON = dataBuffer.toString()
//     return JSON.parse(dataJSON)
//   } catch (err) {
//     return []
//   }
// }
