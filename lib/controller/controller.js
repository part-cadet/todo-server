// const url = require('url')
// const querystring = require('querystring')
const fs = require('fs')
// const AJV = require('ajv')

// const schema = require('../schema/schema')
const { ok } = require('../util/response')
const { boardsDB, todosDB, tasksDB } = require('../database/database')

// const ajv = new AJV({
//   allErrors: true
// })

exports.listBoards = (request, response) => {
  const boards = boardsDB.find()

  const responseBody = {
    status: 'ok',
    result: boards
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
