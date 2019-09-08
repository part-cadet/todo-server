module.exports = {
  info: {
    title: 'Todo Web Application', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'API Documentation for Todo Web Application, in order to work with these APIs, you need to add the token in the request authorization headers. to get a token, create a user using the signup API, the log in with that user; in the response you get a token (which is only valid for 10 minutes), to use the token, paste it in the token field in each API with the word `Bearer` before it.' // Description (optional)
  },
  tags: [
    {
      name: 'Users',
      description: 'APIs for creating, loggin in with, and removing a user'
    },
    {
      name: 'Boards',
      description: 'APIs for creating, listing, updating, and removing boards'
    },
    {
      name: 'Todos',
      description: 'APIs for creating, listing, updating, and removing todos'
    },
    {
      name: 'Tasks',
      description: 'APIs for creating, listing, updating, and removing tasks'
    }
  ]
}
