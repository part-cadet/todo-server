exports.boardSchema = {
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
exports.todoIdSchema = { type: 'object',
  additionalProperties: false,
  properties: {
    todoID: {
      type: 'string',
      format: 'uuid'
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
exports.taskIdSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    taskID: {
      type: 'string',
      format: 'uuid'
    }
  },
  required: [
    'taskID'
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
    },
    imgUrl: {
      type: 'string'
    }
  }
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
exports.boardUpdateSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    name: {
      type: 'string'
    },
    members: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    done: {
      type: 'boolean'
    }
  }
}

exports.boardIDSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    boardID: {
      type: 'integer'
    }
  },
  required: [
    'boardID'
  ]
}
