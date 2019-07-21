const url = require('url')

exports.lookup = (request, response) => {
  const requestURL = new url.URL(request.url)
  
}