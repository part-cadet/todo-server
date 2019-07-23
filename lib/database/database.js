const Loki = require('lokijs')

const db = new Loki()

const boardsDB = db.addCollection('boardsDB')
const todosDB = db.addCollection('todosDB')
const tasksDB = db.addCollection('tasksDB')

module.exports = {
  boardsDB: boardsDB,
  todosDB: todosDB,
  tasksDB: tasksDB
}
