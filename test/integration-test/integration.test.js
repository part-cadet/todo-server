const dotenv = require('dotenv').config()
const server = require('../../lib/server').server

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const expect = require('chai').expect

const validUser = {
  username: 'Demo',
  password: 'DEMOdemo1@34'
}

const invalidUsername = {
  username: 'Dem',
  password: 'DEMOdemo1@34'
}

const invalidPassword = {
  username: 'Demo',
  password: '1234'
}

const newUser = {
  username: 'Tester2',
  password: 'TESTERtester1@34'
}

let token

describe('To-Do Web App Integration Test', () => {
  describe('User APIs', () => {
    describe('#authenticateUser()', () => {
      it('Login completes with right credentials', (done) => {
        chai.request(server)
          .post('/api/login')
          .send(validUser)
          .end((err, res) => {
            if (err) {
              done(err)
            } else {
              expect(res.status).to.equal(200)
              token = res.body.token
              done()
            }
          })
      }).timeout(5000)

      it('Login fails when username does not exist in the database', (done) => {
        chai.request(server)
          .post('/api/login')
          .send(invalidUsername)
          .end((err, res) => {
            if (err) {
              done(err)
            } else {
              // console.log(res.status)
              // console.log(res.body)
              expect(res.status).to.equal(404)
              expect(res.body).to.have.all.keys('status', 'message')
              expect(res.body.status).to.equal('Not Found')
              expect(res.body.message).to.equal('User not found.')
              done()
            }
          })
      }).timeout(5000)

      it('Login fails when password is wrong', (done) => {
        chai.request(server)
          .post('/api/login')
          .send(invalidPassword)
          .end((err, res) => {
            if (err) {
              done(err)
            } else {
              // console.log(res.status)
              // console.log(res.body)
              expect(res.status).to.equal(400)
              expect(res.body).to.have.all.keys('message')
              expect(res.body.message).to.equal('Password Not Verified')
              done()
            }
          })
      }).timeout(5000)
    })

    describe('#addUser()', () => {
      it('successful', (done) => {
        chai.request(server)
          .post('/api/signup')
          .send(newUser)
          .end((err, res) => {
            if (err) {
              done(err)
            } else {
              console.log(res.status)
              console.log(res.body)
              // expect(res.status).to.equal(400)
              // expect(res.body).to.have.all.keys('message')
              // expect(res.body.message).to.equal('Password Not Verified')
              done()
            }
          })
      }).timeout(5000)

      it('password not strong')
    })
  })

  describe('Test Board APIs', () => {
    describe('#listBoards()', () => {
      it('Return a list of user boards', (done) => {
        chai.request(server)
          .get('/api/boards')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            if (err) {
              done(err)
            } else {
              // console.log(res.body)
              expect(res.status).to.equal(200) // Check if the status is Ok
              res.body.forEach(element => {
                expect(element).to.have.all.keys('id', 'title', 'owner_name')
              })
              done()
            }
          })
      })
    })
    it('list boards')
    it('get board by id')
    it('add board')
    it('add member')
    it('remover member')
    it('get todos of board')
    it('get owner of board')
    it('get members of board')
    it('update board')
    it('remove board')
    it('get all members of board')
  })

  describe('Test To-Do APIs', () => {
    it('list todo boards')
    it('get tasks of todo')
    it('add todo')
    it('update todo board')
    it('remove todo board')
    it('get todo by id')
  })

  describe('Test Task APIs', () => {
    it('list tasks')
    it('get task by id')
    it('add task')
    it('update task')
    it('remove task')
    it('get assignee of task')
    it('')
  })
})
