const http = require('http')
const { router } = require('../lib/router/router')
const server = http.createServer()

const winston = require('winston')
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: 'info.log', level: 'info' }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})

server.on('request', function (request, response) {
  logger.info()
  logger.info(`${new Date().toUTCString()} ${request.method} ${request.url}`)
  router.lookup(request, response)
})

exports.server = server
