const Loki = require('lokijs')

const db = new Loki('TodoDB.db')

const boardsDB = db.addCollection('boardsDB')
const todosDB = db.addCollection('todosDB')
const tasksDB = db.addCollection('tasksDB')

// boardsDB.insert({ name: 'Board 1', info: '8 Todos', members: 'Ali, Faezeh', done: false })
// boardsDB.insert({ name: 'Board 2', info: '10 Todos', members: 'Nafiseh, Faezeh', done: true })

todosDB.insert({ title: 'Board 1'})

tasksDB.insert({done:true, description: "hi" , assignee: 'Faezeh',})

exports.boardsDB = boardsDB
exports.todosDB = todosDB
exports.tasksDB = tasksDB
