exports.boardSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    title: {
      type: 'string'
    },
    owner_name: {
      type: 'string'
    }
  },
  required: [
    'title'
  ]
}
exports.todoIDSchema = { type: 'object',
  additionalProperties: false,
  properties: {
    todoID: {
      type: 'string'
      // format: 'uuid'
    }
  },
  required: [
    'todoID'
  ]
}
exports.todoSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    title: {
      type: 'string'
    }
  },
  required: [
    'title'
  ]
}

exports.taskIDSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    taskID: {
      type: 'string'
    }
  },
  required: [
    'taskID'
  ]
}

exports.memberIdSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    memberID: {
      type: 'string'
    }
  },
  required: [
    'memberID'
  ]
}

exports.memberRemoveSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    username: {
      type: 'string'
    },
    boardID: {
      type: 'string'
    }
  },
  required: [
    'username',
    'boardID'
  ]
}

exports.tasksSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    done: {
      type: 'boolean'
    },
    description: {
      type: 'string'
    },
    assignee: {
      type: 'string'
    },
    imgUrl: {
      type: 'string'
    }
  },
  required: [
    'assignee',
    'description',
    'done',
    'imgUrl'
  ]
}
//   type: 'object',
//   additionalProperties: false,
//   properties: {
//     title: {
//       type: 'string'
//     }
//   },
//   required: [
//     'title'
//   ]
// }

exports.tasksUpdateSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    done: {
      type: 'boolean'
    },
    description: {
      type: 'string'
    },
    assignee: {
      type: 'string'
    }
  }
}

exports.tasksSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    description: {
      type: 'string'
    },
    done: {
      type: 'boolean'
    },
    assignee: {
      type: 'string'
    }
  },
  required: [
    'description',
    'done'
  ]
}
exports.boardUpdateSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    title: {
      type: 'string'
    },
    owner: {
      type: 'string'
    }
  },
  required: [
    'title',
    'owner'
  ]
}

exports.boardMemberSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    username: {
      type: 'string'
    }
  },
  required: [
    'username'
  ]
}

exports.boardIDSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    boardID: {
      type: 'string'
    }
  },
  required: [
    'boardID'
  ]
}

exports.userLoginSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    username: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  required: [
    'username',
    'password'
  ]
}

exports.userRemoveSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    username: {
      type: 'string'
    }
  },
  required: ['username']
}
