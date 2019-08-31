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

let token

describe('To-Do Web App Integration Test', () => {
  describe('User APIs', () => {
    describe('#authenticateUser()', () => {
      it('Login successfully with right credentials', (done) => {
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

      it('wrong user')

      it('wrong password')
    })

    describe('#addUser()', () => {
      it('successful')

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
              console.log(res.body)
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
