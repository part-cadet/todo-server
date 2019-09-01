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

exports.ok = (response, data) => {
  // console.log('test')
  response.statusCode = 200
  response.setHeader('Content-Type', 'application/json')
  response.write(JSON.stringify(data))
  response.end('', () => {
    logger.info(`${new Date().toUTCString()} ${response}`)
    logger.info(data)
  })
}

exports.error = (response, data) => {
  response.statusCode = 400
  response.setHeader('Content-Type', 'application/json')
  response.write(JSON.stringify(data))
  response.end('', () => {
    logger.error(`${new Date().toUTCString()} ${response}`)
    logger.error(data)
  })
}

exports.errorNotFound = (response, data) => {
  response.statusCode = 404
  response.setHeader('Content-Type', 'application/json')
  response.write(JSON.stringify(data))
  response.end('', () => {
    logger.error(`${new Date().toUTCString()} ${response}`)
    logger.error(data)
  })
}

exports.errorServerInternal = (response, data) => {
  response.statusCode = 500
  response.setHeader('Content-Type', 'application/json')
  response.write(JSON.stringify(data))
  response.end('', () => {
    logger.error(`${new Date().toUTCString()} ${response}`)
    logger.error(data)
  })
}

exports.created = (response, data) => {
  response.statusCode = 201
  response.setHeader('Content-Type', 'application/json')
  response.write(JSON.stringify(data))
  response.end('', () => {
    logger.info(`${new Date().toUTCString()} ${response}`)
    logger.info(data)
  })
}

exports.tokenExpired = (response, data) => {
  response.statusCode = 401
  response.setHeader('Content-Type', 'application/json')
  response.write(JSON.stringify(data))
  response.end('', () => {
    logger.error(`${new Date().toUTCString()} ${response}`)
    logger.error(data)
  })
}
