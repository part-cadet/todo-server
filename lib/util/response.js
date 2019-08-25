exports.ok = (response, data) => {
  response.statusCode = 200
  response.setHeader('Content-Type', 'application/json')
  response.write(JSON.stringify(data))
  response.end()
}

exports.error = (response, data) => {
  response.statusCode = 400
  response.setHeader('Content-Type', 'application/json')
  response.write(JSON.stringify(data))
  response.end()
}

exports.errorNotFound = (response, data) => {
  response.statusCode = 404
  response.setHeader('Content-Type', 'application/json')
  response.write(JSON.stringify(data))
  response.end()
}

exports.errorServerInternal = (response, data) => {
  response.statusCode = 500
  response.setHeader('Content-Type', 'application/json')
  response.write(JSON.stringify(data))
  response.end()
}

exports.created = (response, data) => {
  response.statusCode = 201
  response.setHeader('Content-Type', 'application/json')
  response.write(JSON.stringify(data))
  response.end()
}

exports.tokenExpired = (response, data) => {
  response.statusCode = 401
  response.setHeader('Content-Type', 'application/json')
  response.write(JSON.stringify(data))
  response.end()
}
