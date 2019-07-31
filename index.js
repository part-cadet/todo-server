const dotenv = require('dotenv').config()
const server = require('./lib/server').server
const PORT = process.env.PORT || 80

console.log(dotenv.parsed)

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})
