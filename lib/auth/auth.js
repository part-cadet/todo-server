const crypto = require('crypto')
const passwordSheriff = require('password-sheriff')
const jwt = require('jsonwebtoken')

const PasswordPolicy = passwordSheriff.PasswordPolicy
const charSet = require('password-sheriff').charsets

const SALTLENGTH = process.env.SALTLENGTH ? process.env.SALTLENGTH : 128
const PRIVATEKEY = process.env.PRIVATEKEY ? process.env.PRIVATEKEY : 'ETbrCY|PlBd(ig7'

exports.PasswordPolicy = new PasswordPolicy({
  length: {
    minLength: 5
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
    hashedPassword: hashVal
  }
}

function passVerified (pass, salt, hash) {
  const hashedPass = createHash(pass, salt)
  return hashedPass.hashedPassword === hash
}

function signToken (payload) {
  return jwt.sign(payload, PRIVATEKEY, { expiresIn: '10m' })
  // return jwt.sign(payload, PRIVATEKEY)
}

function hasAccess (request) {
  // console.log(request)
  const authHeaders = request.headers.authorization
  // console.log(authHeaders)

  if (authHeaders) {
    const authHeadersDivided = authHeaders.split(' ')
    const authType = authHeadersDivided[0]
    const authToken = authHeadersDivided[1]
    console.log(authType)
    console.log(authToken)

    if (authType === 'Bearer') {
      try {
        const payload = jwt.verify(authToken, PRIVATEKEY)
        return {
          payload: payload,
          verify: true
        }
      } catch (e) {
        console.log('1')
        return {
          payload: null,
          verify: false
        }
      }
    } else {
      console.log('2')
      return {
        payload: null,
        verify: false
      }
    }
  } else {
    console.log('3')
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
