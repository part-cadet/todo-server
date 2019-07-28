exports.boardSchema = {
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
  },
  required: [
    'done',
    'members',
    'name'
  ]
}
exports.todoIdSchema = {}
exports.todoSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    title: {
      type: 'string'
    },
    boardID: {
      type: 'string',
      format: 'uuid'
    }
  },
  required: [
    'title'
  ]
}
exports.taskIdSchema = {}

exports.tasksSchema =
{
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
      type: 'string',
      format: 'uuid'
    }
  },
  required: [
    'boardID'
  ]
}
