// const url = require('url')
// const querystring = require('querystring')
const fs = require('fs')
// const AJV = require('ajv')

// const schema = require('../schema/schema')
const { ok } = require('../util/response')

// const ajv = new AJV({
//   allErrors: true
// })

exports.listBoards = (response) => {
  let responseBody = {}
  let boards = null
  boards = loadBoards()

  responseBody = {
    status: 'ok',
    result: boards
  }
  ok(response, responseBody)
}

function loadBoards () {
  let dataBuffer = null
  try {
    dataBuffer = fs.readFileSync('/Users/Galiold/Projects/part-cadet/todo/lib/Models/boards.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (err) {
    return []
  }
}
