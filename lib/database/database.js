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

const {
  Client
} = require('pg')

exports.getBoards = () => {
  const dbClient = new Client()
  let result
  const query = {
    name: 'getBoards',
    text: `SELECT * FROM boards`
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

exports.getTodosOfBoard = (boardID) => {
  const dbClient = new Client()
  let result
  const query = {
    name: 'getTodosOfBoard',
    text: 'SELECT * FROM todos WHERE board_id = ($1)',
    values: [boardID]
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

exports.getOwnerOfBoard = (boardID) => {
  const dbClient = new Client()
  let result
  const query = {
    name: 'getOwnerOfBoards',
    text: `
    SELECT members.name
    FROM board_member,
         members
    WHERE board_id = $1
      AND board_member.member_id = members.id
      AND board_member.access = 'owner'
    `,
    values: [boardID]
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

exports.getTasksOfBoard = (boardID) => {
  const dbClient = new Client()
  let result
  const query = {
    name: 'getTasksOfBoards',
    text: `
    SELECT tasks.*
FROM tasks,
     todos,
     boards
WHERE todos.board_id = boards.id
  AND tasks.todo_id = todos.id
AND boards.id = $1
group by boards.id, tasks.id
    `,
    values: [boardID]
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

exports.getMembersOfBoard = (boardID) => {
  const dbClient = new Client()
  let result
  const query = {
    name: 'getMembersOfBoards',
    text: `
    SELECT *
FROM boards,
     board_member,
     members
WHERE boards.id = board_member.board_id
  AND board_member.member_id = members.id
  AND boards.id = $1
    `,
    values: [boardID]
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
    name: 'deleteBoard',
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

exports.getTasks = () => {
  const dbClient = new Client()
  let result
  const query = {
    name: 'getTasks',
    text: 'SELECT * FROM tasks'
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

exports.findTaskByID = (id) => {
  const dbClient = new Client()
  let result
  const query = {
    name: 'getTask',
    text: 'SELECT * FROM tasks WHERE id = ($1)',
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

exports.addTask = (description, done, assignee, todoID) => {
  console.log("hi");
  
  const dbClient = new Client()
  let result
  const query = {
    name: 'addTask',
    text: 'INSERT INTO tasks(description, done, assignee, todo_id) VALUES($1, $2, $3, $4)',
    values: [description, done, assignee, todoID]
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

exports.getTodoBoards = () => {
  const dbClient = new Client()
  let result
  const query = {
    name: 'getTodoBoards',
    text: 'SELECT * FROM todos'
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

exports.findTodoBooardByID = (id) => {
  const dbClient = new Client()
  let result
  const query = {
    name: 'getTodoBoards',
    text: 'SELECT * FROM todos WHERE id = ($1)',
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
exports.addTodoBoard = (title, boardID) => {
  const dbClient = new Client()
  let result
  const query = {
    name: 'addTodoBoard ',
    text: 'INSERT INTO todos(title, board_id) VALUES($1, $2)',
    values: [title, boardID]
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
exports.removeTodoBoard = (todoID) => {
  let result
  const dbClient = new Client()
  const query = {
    name: 'deleteTodoBoard',
    text: 'DELETE FROM todos WHERE id = $1',
    values: [todoID]
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

exports.updateTodoBoard = (todoID, updateData) => {
  const dbClient = new Client()
  let result
  const query = {
    name: 'updatetodos',
    text: 'UPDATE todos SET title= $1 WHERE id = $2',
    values: [updateData.title, todoID]
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
