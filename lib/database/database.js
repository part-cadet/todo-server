// const Loki = require('lokijs')

// const db = new Loki()

// const boardsDB = db.addCollection('boardsDB')
// const todosDB = db.addCollection('todosDB')
// const tasksDB = db.addCollection('tasksDB')

// module.exports = {
//   boardsDB: boardsDB,
//   todosDB: todosDB,
//   tasksDB: tasksDB
// }

const { Client } = require('pg')

exports.getBoards = () => {
  const dbClient = new Client()
  let result
  const query = {
    name: 'getBoards',
    text: `select table3.*, table5.unfinishedtasks
    from (select table1.*, table2.taskcount
          from (SELECT boards.id, boards.title, name as owner, count(todos.*)
                FROM boards,
                     members,
                     board_member,
                     todos
                WHERE boards.id = board_member.board_id
                  AND members.id = board_member.member_id
                  AND board_member.access = 'owner'
                  AND todos.board_id = boards.id
                GROUP BY boards.id, boards.title, name) as table1(board_id, title, owner, todocount),
               (select board_id, count(todos.*)
                from todos,
                     tasks
                where tasks.todo_id = todos.id
                group by todos.board_id) as table2(boardID, taskcount)
          where table1.board_id = table2.boardID) as table3,
         (select board_id, count(todos.*)
          from todos,
               tasks
          where tasks.todo_id = todos.id
            AND tasks.done = false
          group by todos.board_id) as table5(boardID, unfinishedtasks)
    where table3.board_id = table5.boardID
    `
  }
  return dbClient
    .connect()
    .then(() => {
      const queryExec = dbClient.query(query)
      return queryExec
    })
    .then((res) => {
      result = res.rows
      return dbClient.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}

exports.findBoardByID = (id) => {
  const dbClient = new Client()
  let result
  const query = {
    name: 'getBoards',
    text: 'SELECT * FROM boards WHERE id = ($1)',
    values: [id]
  }
  return dbClient
    .connect()
    .then(() => {
      const queryExec = dbClient.query(query)
      return queryExec
    })
    .then((res) => {
      result = res.rows
      return dbClient.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}

exports.addBoard = (title) => {
  const dbClient = new Client()
  let result
  const query = {
    name: 'addBoard',
    text: 'INSERT INTO boards(title) VALUES($1)',
    values: [title]
  }
  return dbClient
    .connect()
    .then(() => {
      const queryExec = dbClient.query(query)
      return queryExec
    })
    .then((res) => {
      result = res.rows
      return dbClient.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}

exports.updateBoard = (boardID, updateData) => {
  const dbClient = new Client()
  let result
  const query = {
    name: 'updateBoard',
    text: 'UPDATE boards SET title= $1 WHERE id = $2',
    values: [updateData.title, boardID]
  }
  return dbClient
    .connect()
    .then(() => {
      const queryExec = dbClient.query(query)
      return queryExec
    })
    .then((res) => {
      result = res.rowCount
      return dbClient.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}

exports.removeBoard = (boardID) => {
  let result
  const dbClient = new Client()
  const query = {
    name: 'updateBoard',
    text: 'DELETE FROM boards WHERE id = $1',
    values: [boardID]
  }
  return dbClient
    .connect()
    .then(() => {
      const queryExec = dbClient.query(query)
      return queryExec
    })
    .then((res) => {
      result = res.rowCount
      return dbClient.end()
    })
    .then((res) => {
      return result
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
