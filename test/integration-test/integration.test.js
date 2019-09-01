/* eslint-disable no-undef */
require('dotenv').config()
const server = require('../../lib/server').server

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const expect = require('chai').expect

const invalidUsername = {
  username: 'Testsdkf;adnskdas;vnafodvafdsfjsdfknsdfnasdf;askdmvafnvorenaeoivmsimfasofm',
  password: '1234'
}

const invalidPassword = {
  username: 'UserCreatedForIntegrationTest',
  password: '1234'
}

const newUser = {
  username: 'UserCreatedForIntegrationTest',
  password: 'TESTtest1@34'
}

let token
let boardID

describe('To-Do Web App Integration Test', () => {
  describe('Auth', () => {
    describe('POST /api/signup', () => {
      it('should fail with a weak password')

      it('should create a new user for test', (done) => {
        chai.request(server)
          .post('/api/signup')
          .send(newUser)
          .end((err, res) => {
            if (err) {
              done(err)
            } else {
              expect(res.status).to.equal(201)
              expect(res.body).to.have.all.keys('status', 'message')
              expect(res.body.status).to.equal('Ok')
              expect(res.body.message).to.equal('New user added.')
              done()
            }
          })
      }).timeout(5000)
    })

    describe('POST /api/login', () => {
      it('should fail without proper username', (done) => {
        chai.request(server)
          .post('/api/login')
          .send(invalidUsername)
          .end((err, res) => {
            if (err) {
              done(err)
            } else {
              expect(res.status).to.equal(404)
              expect(res.body).to.have.all.keys('status', 'message')
              expect(res.body.status).to.equal('Not Found')
              expect(res.body.message).to.equal('User not found.')
              done()
            }
          })
      }).timeout(5000)

      it('should fail without proper password', (done) => {
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

      it('should succeed with proper credentials', (done) => {
        chai.request(server)
          .post('/api/login')
          .send(newUser)
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
    })
  })

  describe('Boards', () => {
    describe('POST /api/boards', () => {
      it('should create a board', (done) => {
        chai.request(server)
          .post('/api/boards')
          .set('Authorization', `Bearer ${token}`)
          .send({ title: 'Test' })
          .end((err, res) => {
            if (err) {
              done(err)
            } else {
              expect(res.status).to.equal(201)
              expect(res.body).to.have.all.keys('status', 'message')
              expect(res.body.status).to.equal('Ok')
              expect(res.body.message).to.equal('New board added.')
              done()
            }
          })
      })
    })

    describe('GET /api/boards', () => {
      it('should return a list of boards', (done) => {
        chai.request(server)
          .get('/api/boards')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            if (err) {
              done(err)
            } else {
              // console.log(res.body)
              expect(res.status).to.equal(200) // Check if the status is Ok
              boardID = res.body[0].id
              // console.log(boardID)
              res.body.forEach(element => {
                expect(element).to.have.all.keys('id', 'title', 'owner_name')
              })
              done()
            }
          })
      })
    })

    describe('DELETE /api/boards', () => {
      it('should remove board', (done) => {
        chai.request(server)
          .delete(`/api/boards/${boardID}`)
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            if (err) {
              done(err)
            } else {
              expect(res.status).to.equal(200)
              expect(res.body).to.have.all.keys('status', 'message')
              expect(res.body.status).to.equal('Ok')
              expect(res.body.message).to.equal('Board deleted.')
              // console.log(res.body)
              // expect(res.status).to.equal(200) // Check if the status is Ok
              // res.body.forEach(element => {
              //   expect(element).to.have.all.keys('id', 'title', 'owner_name')
              // })
              done()
            }
          })
      })
    })

    it('should return the board requested by id', (done) => {
      
    })
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

  describe('DELETE /api/users', (done) => {
    it('Remove the created user', (done) => {
      chai.request(server)
        .delete('/api/users')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res.status).to.equal(200)
            expect(res.body).to.have.all.keys('status', 'message')
            expect(res.body.status).to.equal('Ok')
            expect(res.body.message).to.equal('User deleted.')
            done()
          }
        })
    }).timeout(5000)
  })
})
