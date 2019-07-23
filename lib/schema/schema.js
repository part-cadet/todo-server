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
