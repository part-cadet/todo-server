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
