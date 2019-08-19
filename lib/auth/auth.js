const crypto = require('crypto')
const passwordSheriff = require('password-sheriff')
const jwt = require('jsonwebtoken')

const PasswordPolicy = passwordSheriff.PasswordPolicy
const charSet = require('password-sheriff').charsets

const SALTLENGTH = process.env.SALTLENGTH ? process.env.SALTLENGTH : 128
const PRIVATEKEY = process.env.PRIVATEKEY ? process.env.PRIVATEKEY : 'ETbrCY|PlBd(ig7'

exports.PasswordPolicy = new PasswordPolicy({
  length: {
    minLength: 10
  },
  contains: {
    expressions: [charSet.lowerCase, charSet.upperCase, charSet.numbers, charSet.specialCharacters]
  }
})

function genRandomString (length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length)
}

function createHash (pass, salt) {
  let addedSalt = ''
  if (!salt) {
    addedSalt = genRandomString(SALTLENGTH)
  } else {
    addedSalt = salt
  }

  const hashVal = crypto
    .createHmac('sha512', addedSalt)
    .update(pass)
    .digest('hex')

  return {
    salt: addedSalt,
    password: hashVal
  }
}

function passVerified (pass, salt, hash) {
  const hashedPass = createHash(pass, salt)
  return hashedPass.password === hash
}

function signToken (payload) {
  return jwt.sign(payload, PRIVATEKEY)
}

function hasAccess (request) {
  const authHeaders = request.headers['authorization']

  if (authHeaders) {
    const authHeadersDivided = authHeaders.split(' ')
    const authType = authHeadersDivided[0]
    const authToken = authHeadersDivided[1]

    if (authType === 'bearer') {
      try {
        const payload = jwt.verify(authToken, PRIVATEKEY)

        return {
          payload: payload,
          verify: true
        }
      } catch (e) {
        return {
          payload: null,
          verify: false
        }
      }
    } else {
      return {
        payload: null,
        verify: false
      }
    }
  } else {
    return {
      payload: null,
      verify: false
    }
  }
}

exports.createHash = createHash
exports.passVerified = passVerified
exports.signToken = signToken
exports.hasAccess = hasAccess
