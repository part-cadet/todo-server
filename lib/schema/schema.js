exports.todoIdSchema = {}
exports.todoSchema = {
    "type": "object",
    "additionalProperties": false,
    "properties": {
        "title": {
            "type": "string"
        }
    },
    "required": [
        "title"
    ]
}
exports.taskIdSchema={}

exports.tasksSchema= 
{
    "type": "object",
    "additionalProperties": false,
    "properties": {
        "done": {
            "type": "boolean"
        },
        "description": {
            "type": "string"
        },
        "assignee": {
            "type": "string"
        },
        "imgUrl": {
            "type": "string"
        }
    },
    "required": [
        "assignee",
        "description",
        "done",
        "imgUrl"
    ]
}