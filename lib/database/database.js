const {
  Pool
} = require('pg')

const pool = new Pool()

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

exports.getBoards = (username) => {
  const query = {
    name: 'getBoards',
    text: `SELECT *
    FROM boards
    WHERE owner_name = $1
    UNION
    SELECT boards.*
    FROM boards
             INNER JOIN board_member bm on boards.id = bm.board_id
    WHERE bm.username = $1
    ORDER BY title ASC`,
    values: [username]
  }
  return pool.query(query)
    .then(res => {
      return res.rows
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}

exports.getTodosOfBoard = (boardID) => {
  const query = {
    name: 'getTodosOfBoard',
    text: 'SELECT * FROM todos WHERE board_id = $1',
    values: [boardID]
  }
  return pool.query(query)
    .then(res => {
      return res.rows
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}

exports.getOwnerOfBoard = (boardID) => {
  const query = {
    name: 'getOwnerOfBoards',
    text: `SELECT owner_name FROM boards WHERE id = $1`,
    values: [boardID]
  }
  return pool.query(query)
    .then(res => {
      return res.rows
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}

exports.getTasksOfBoard = (boardID) => {
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
GROUP BY boards.id, tasks.id
    `,
    values: [boardID]
  }
  return pool.query(query)
    .then(res => {
      return res.rows
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}

exports.getMembersOfBoard = (boardID) => {
  const query = {
    name: 'getMembersOfBoards',
    text: `SELECT members.*
    FROM board_member, members
    WHERE (board_member.board_id = $1 AND board_member.username = members.name)
    ORDER BY members.name ASC`,
    values: [boardID]
  }
  return pool.query(query)
    .then(res => {
      return res.rows
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}

exports.getAllMembersOfBoard = (taskID) => {
  const query = {
    name: 'getAllMembersOfBoards',
    text: `SELECT members.*
    FROM members
             INNER JOIN (SELECT boards.*
                         FROM boards
                                  INNER JOIN todos t on boards.id = t.board_id
                                  INNER JOIN tasks ON t.id = tasks.todo_id
                         WHERE tasks.id = $1) board_of_task ON board_of_task.owner_name = members.name
    UNION
    SELECT members.*
    FROM members
             INNER JOIN (SELECT board_member.*
                         FROM board_member
                                  INNER JOIN todos t on board_member.board_id = t.board_id
                                  INNER JOIN tasks ON t.id = tasks.todo_id
                         WHERE tasks.id = $1) board_of_task ON board_of_task.username = members.name`,
    values: [taskID]
  }
  return pool.query(query)
    .then(res => {
      return res.rows
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}

exports.findBoardByID = (id) => {
  const query = {
    name: 'getBoards',
    text: 'SELECT * FROM boards WHERE id = ($1)',
    values: [id]
  }
  return pool.query(query)
    .then(res => {
      return res.rows
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}

exports.addBoard = (body, username) => {
  const query = {
    name: 'addBoard',
    text: 'INSERT INTO boards(title, owner_name) VALUES($1, $2)',
    values: [body.title, username]
  }
  return pool.query(query)
    .then(res => {
      return res.rows
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}
exports.addMember = (boardID, body) => {
  const query = {
    name: 'addMember',
    text: 'INSERT INTO board_member(board_id, username) VALUES($1, $2)',
    values: [boardID, body.username]
  }
  return pool.query(query)
    .then(res => {
      return res.rowCount
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}
exports.updateBoard = (boardID, updateData, username) => {
  const query = {
    name: 'updateBoard',
    text: 'UPDATE boards SET title = $1 WHERE id = $2 AND owner_name = $3',
    values: [updateData.title, boardID, username]
  }
  return pool.query(query)
    .then(res => {
      return res.rowCount
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}

exports.removeBoard = (boardID, username) => {
  const query = {
    name: 'deleteBoard',
    text: 'DELETE FROM boards WHERE id = $1 AND owner_name = $2',
    values: [boardID, username]
  }
  return pool.query(query)
    .then(res => {
      return res.rowCount
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}

exports.getTasks = () => {
  const query = {
    name: 'getTasks',
    text: 'SELECT * FROM tasks ORDER BY description ASC'
  }
  return pool.query(query)
    .then(res => {
      return res.rows
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}

exports.findTaskByID = (id) => {
  const query = {
    name: 'getTask',
    text: 'SELECT * FROM tasks WHERE id = ($1)',
    values: [id]
  }
  return pool.query(query)
    .then(res => {
      return res.rows
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}

exports.addTask = (description, done, assignee, todoID) => {
  const query = {
    name: 'addTask',
    text: 'INSERT INTO tasks(description, done, assignee, todo_id) VALUES($1, $2, $3, $4)',
    values: [description, done, assignee, todoID]
  }
  return pool.query(query)
    .then(res => {
      return res.rows
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}

exports.updateTask = (taskID, updateData) => {
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
  } else if (typeof updateData.assignee !== 'undefined') {
    console.log(`Setting task's assignee to ${updateData.assignee} taskID: ${taskID}`)
    query = {
      name: 'updateTask',
      text: `UPDATE tasks
      SET assignee = $1
      WHERE id = $2
        AND EXISTS(SELECT *
                   FROM (SELECT members.*
                         FROM members
                                  INNER JOIN (SELECT boards.*
                                              FROM boards
                                                       INNER JOIN todos t on boards.id = t.board_id
                                                       INNER JOIN tasks ON t.id = tasks.todo_id
                                              WHERE tasks.id = $2) board_of_task ON board_of_task.owner_name = members.name
                         UNION
                         SELECT members.*
                         FROM members
                                  INNER JOIN (SELECT board_member.*
                                              FROM board_member
                                                       INNER JOIN todos t on board_member.board_id = t.board_id
                                                       INNER JOIN tasks ON t.id = tasks.todo_id
                                              WHERE tasks.id = $2) board_of_task
                                             ON board_of_task.username = members.name) AS all_members
                   WHERE all_members.name = $1)`,
      values: [updateData.assignee, taskID]
    }
  }
  return pool.query(query)
    .then(res => {
      return res.rowCount
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}

exports.getTodoBoards = () => {
  const query = {
    name: 'getTodoBoards',
    text: 'SELECT * FROM todos'
  }
  return pool.query(query)
    .then(res => {
      return res.rows
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}

exports.getAssigneeOfTask = (username) => {
  const query = {
    name: 'getAssigneeOfTask',
    text: `SELECT m.name, m.profile_pic
           FROM members m
            WHERE m.name = $1`,
    values: [username]
  }
  return pool.query(query)
    .then(res => {
      return res.rows
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}

exports.getTaskOfTodo = (todoID) => {
  const query = {
    name: 'getTasksOfTodo',
    text: 'SELECT * FROM tasks WHERE todo_id = $1 ORDER BY tasks.description ASC',
    values: [todoID]
  }
  return pool.query(query)
    .then(res => {
      return res.rows
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}

exports.findTodoBooardByID = (id) => {
  const query = {
    name: 'getTodoBoards',
    text: 'SELECT * FROM todos WHERE id = ($1)',
    values: [id]
  }
  return pool.query(query)
    .then(res => {
      return res.rows
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}

exports.addTodoBoard = (title, boardID) => {
  const query = {
    name: 'addTodoBoard ',
    text: 'INSERT INTO todos(title, board_id) VALUES($1, $2)',
    values: [title, boardID]
  }
  return pool.query(query)
    .then(res => {
      return res.rows
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}
exports.removeTodoBoard = (todoID) => {
  const query = {
    name: 'deleteTodoBoard',
    text: 'DELETE FROM todos WHERE id = $1',
    values: [todoID]
  }
  return pool.query(query)
    .then(res => {
      return res.rowCount
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}

exports.updateTodoBoard = (todoID, updateData) => {
  const query = {
    name: 'updatetodos',
    text: 'UPDATE todos SET title= $1 WHERE id = $2',
    values: [updateData.title, todoID]
  }
  return pool.query(query)
    .then(res => {
      return res.rowCount
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}

exports.addTask = (body, todoID) => {
  const query = {
    name: 'addTask ',
    text: 'INSERT INTO tasks(description, done, todo_id) VALUES($1, $2, $3)',
    values: [body.description, body.done, todoID]
  }
  return pool.query(query)
    .then(res => {
      return res.rows
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}

exports.removeTask = (taskID) => {
  const query = {
    name: 'deleteTask',
    text: 'DELETE FROM tasks WHERE id = $1',
    values: [taskID]
  }
  return pool.query(query)
    .then(res => {
      return res.rowCount
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}

exports.findUser = (username) => {
  let query
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
  return pool.query(query)
    .then(res => {
      return res.rows
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}

exports.addUser = (user) => {
  const query = {
    name: 'addUser',
    text: 'INSERT INTO members(name, passwd, salt) VALUES($1, $2, $3)',
    values: [user.username, user.password, user.salt]
  }
  return pool.query(query)
    .then(res => {
      return res.rows
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}
  
exports.removeUserAccount = (username) => {
  const query = {
    name: 'removeUser',
    text: 'DELETE FROM members WHERE name = $1',
    values: [username]
  }
  return pool.query(query)
    .then(res => {
      return res.rows
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}

exports.removeMember = (info, username) => {
  const query = {
    name: 'deleteBoard',
    text: `DELETE
    FROM board_member
    WHERE username = $1
      AND board_id = $2
      AND EXISTS(SELECT * FROM boards WHERE id = $2 AND owner_name = $3)`,
    values: [info.username, info.boardID, username]
  }
  return pool.query(query)
    .then(res => {
      return res.rowCount
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}
exports.getUsers = () => {
  const query = {
    name: 'getUsers',
    text: 'SELECT * FROM members'
  }
  return pool.query(query)
    .then(res => {
      return res.rows
    })
    .catch(e => {
      console.log(e.stack)
      throw e
    })
}

