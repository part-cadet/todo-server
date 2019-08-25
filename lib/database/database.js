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
    text: 'SELECT * FROM todos WHERE board_id = $1',
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
    text: `SELECT owner_name FROM boards WHERE id = $1`,
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
    text: `SELECT members.*
    FROM board_member, members
    WHERE (board_member.board_id = $1 AND board_member.username = members.name)`,
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

exports.addBoard = (body) => {
  const dbClient = new Client()
  let result
  const query = {
    name: 'addBoard',
    text: 'INSERT INTO boards(title, owner_name) VALUES($1, $2)',
    values: [body.title, body.owner_name]
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
exports.addMember = (boardID, body) => {
  const dbClient = new Client()
  let result
  const query = {
    name: 'addMember',
    text: 'INSERT INTO board_member(board_id, username) VALUES($1, $2)',
    values: [boardID, body.username]
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
exports.updateBoard = (boardID, updateData) => {
  const dbClient = new Client()
  let result
  const query = {
    name: 'updateBoard',
    text: 'UPDATE boards SET title = $1, owner_name = $2 WHERE id = $3',
    values: [updateData.title, updateData.owner, boardID]
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
  console.log('hi')

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

exports.updateTask = (taskID, updateData) => {
  const dbClient = new Client()
  let result
  let query
  if (typeof updateData.done !== 'undefined') {
    console.log(`Setting task's done to ${updateData.done} taskID: ${taskID}`)
    query = {
      name: 'updateTask',
      text: 'UPDATE tasks SET done = $1 WHERE id = $2',
      values: [updateData.done, taskID]
    }
  } else if (typeof updateData.description !== 'undefined') {
    console.log(`Setting task's description to ${updateData.description} taskID: ${taskID}`)
    query = {
      name: 'updateTask',
      text: 'UPDATE tasks SET description = $1 WHERE id = $2',
      values: [updateData.description, taskID]
    }
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

exports.getAssigneeOfTask = (memberID) => {
  const dbClient = new Client()
  let result
  const query = {
    name: 'getMembersOfBoards',
    text: `SELECT m.name, m.profile_pic
           FROM members m
            WHERE m.id = $1`,
    values: [memberID]
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

exports.getTaskOfTodo = (todoID) => {
  const dbClient = new Client()
  let result
  const query = {
    name: 'getTasksOfTodo',
    text: 'SELECT * FROM tasks WHERE todo_id = ($1)',
    values: [todoID]
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

exports.addTask = (body, todoID) => {
  const dbClient = new Client()
  let result
  const query = {
    name: 'addTask ',
    text: 'INSERT INTO tasks(description, done, todo_id) VALUES($1, $2, $3)',
    values: [body.description, body.done, todoID]
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

exports.removeTask = (taskID) => {
  let result
  const dbClient = new Client()
  const query = {
    name: 'deleteTask',
    text: 'DELETE FROM tasks WHERE id = $1',
    values: [taskID]
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

exports.findUser = (username) => {
  console.log(username);
  
  let result
  let query
  const dbClient = new Client()
  if (username) {
    query = {
      name: 'findUser',
      text: 'SELECT * FROM members where name = $1',
      values: [username]
    }
  } else {
    query = {
      name: 'findUsers',
      text: 'SELECT * FROM members'
    }
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
      console.log(result);
      
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}

exports.addUser = (user) => {
  const dbClient = new Client()
  let result
  const query = {
    name: 'addUser',
    text: 'INSERT INTO members(name, passwd, salt) VALUES($1, $2, $3)',
    values: [user.username, user.password, user.salt]
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
exports.removeMember = (info) => {
  console.log(info)
  let result
  const dbClient = new Client()
  const query = {
    name: 'deleteBoard',
    text: 'DELETE FROM board_member WHERE username = $1 AND board_id = $2',
    values: [info.username, info.boardID]
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
      return result.rows
    })
    .catch((e) => {
      console.error(e.stack)
      throw e
    })
}
