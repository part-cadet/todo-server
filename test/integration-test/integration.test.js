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
  username: 'UserCreatedForIntegrationTest2',
  password: '1234'
}

const newUser = {
  username: 'UserCreatedForIntegrationTest2',
  password: 'TESTtest1@34'
}

const newUserWithWeakPass = {
  username: 'UserCreatedForIntegrationTest',
  password: '1'
}

let token
let boardID
let todoboardID
let taskID

describe('To-Do Web App Integration Test', () => {
  describe('Auth', () => {
    describe('POST /api/signup', () => {
      it('should fail with a weak password', (done) => {
        chai.request(server)
          .post('/api/signup')
          .send(newUserWithWeakPass)
          .end((err, res) => {
            if (err) {
              done(err)
            } else {
              expect(res.status).to.equal(400)
              expect(res.body).to.have.all.keys('rules', 'verified')
              expect(res.body.verified).to.equal(false)
              done()
            }
          })
      }).timeout(5000)

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

  describe('General APIs', () => {
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
    }).timeout(5000)

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
    }).timeout(5000)

    it('should return a board requested by id', (done) => {
      chai.request(server)
        .get(`/api/boards/${boardID}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res.status).to.equal(200) // Check if the status is Ok
            expect(res.body).to.have.all.keys('status', 'result')
            expect(res.body.status).to.equal('Ok')
            expect(res.body.result[0]).to.have.all.keys('id', 'title', 'owner_name')
            expect(res.body.result[0].id).to.equal(boardID)
            expect(res.body.result[0].title).to.equal('Test')
            expect(res.body.result[0].owner_name).to.equal(newUser.username)
            done()
          }
        })
    }).timeout(5000)

    it('should return the owner of requested board', (done) => {
      chai.request(server)
        .get(`/api/boards/ownerof/${boardID}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res.status).to.equal(200) // Check if the status is Ok
            expect(res.body).to.have.all.keys('status', 'result')
            expect(res.body.status).to.equal('Ok')
            expect(res.body.result[0]).to.have.all.keys('owner_name')
            expect(res.body.result[0].owner_name).to.equal(newUser.username)
            done()
          }
        })
    }).timeout(5000)

    it('should return a list of the requested board\'s members', (done) => {
      chai.request(server)
        .get(`/api/boards/membersof/${boardID}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res.status).to.equal(200) // Check if the status is Ok
            expect(res.body).to.have.all.keys('status', 'result')
            expect(res.body.status).to.equal('Ok')
            done()
          }
        })
    }).timeout(5000)

    it('should update the requested board', (done) => {
      chai.request(server)
        .put(`/api/boards/${boardID}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Updated Title' })
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res.status).to.equal(200) // Check if the status is Ok
            expect(res.body).to.have.all.keys('status', 'message')
            expect(res.body.status).to.equal('Ok')
            expect(res.body.message).to.equal('Board updated.')
            done()
          }
        })
    }).timeout(5000)

    it('should create a todo board', (done) => {
      chai.request(server)
        .post(`/api/todo/${boardID}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Test' })
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res.body).to.have.all.keys('status', 'message')
            expect(res.body.status).to.equal('Ok')
            expect(res.body.message).to.equal('New todo board added.')

            done()
          }
        })
    }).timeout(5000)

    it('should return a list of todo boards', (done) => {
      chai.request(server)
        .get(`/api/boards/todosof/${boardID}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            console.log(res.body)
            expect(res.status).to.equal(200) // Check if the status is Ok
            todoboardID = res.body.result[0].id
            console.log(todoboardID)
            console.log(res.body.result[0].id)
            // res.body.forEach(element => {
            //   expect(element).to.have.all.keys('id', 'title', 'board_id')
            // })
            done()
          }
        })
    }).timeout(5000)

    it('should create a task', (done) => {
      chai.request(server)
        .post(`/api/tasks/${todoboardID}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ done: false, description: 'test', assignee: 'Faezeh' })
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res.body).to.have.all.keys('status', 'message')
            expect(res.body.status).to.equal('Ok')
            expect(res.body.message).to.equal('New task added.')

            done()
          }
        })
    }).timeout(5000)

    it('should return a list of tasks', (done) => {
      console.log('todo ID', todoboardID)
      chai.request(server)
        .get(`/api/todo/tasksof/${todoboardID}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            console.log(res.body)
            expect(res.status).to.equal(200) // Check if the status is Ok
            expect(res.body).to.have.all.keys('status', 'message', 'result')
            expect(res.body.result[0]).to.have.all.keys('id', 'description', 'done', 'assignee', 'todo_id')
            taskID = res.body.result[0].id
            done()
          }
        })
    }).timeout(5000)

    it('should update tasks done', (done) => {
      chai.request(server)
        .put(`/api/tasks/${taskID}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ done: false })
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res.body).to.have.all.keys('status', 'message')
            expect(res.body.status).to.equal('Ok')
            expect(res.body.message).to.equal('Task updated.')
            done()
          }
        })
    }).timeout(10000)

    it('should update tasks description', (done) => {
      chai.request(server)
        .put(`/api/tasks/${taskID}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ description: 'updated' })
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res.body).to.have.all.keys('status', 'message')
            expect(res.body.status).to.equal('Ok')
            expect(res.body.message).to.equal('Task updated.')
            done()
          }
        })
    }).timeout(5000)

    it('should update tasks Assignee', (done) => {
      chai.request(server)
        .put(`/api/tasks/${taskID}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ assignee: newUser.username })
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res.body).to.have.all.keys('status', 'message')
            expect(res.body.status).to.equal('Ok')
            expect(res.body.message).to.equal('Task updated.')
            done()
          }
        })
    }).timeout(10000)

    it('should return a list of the members and owner of a board requested by the task id', (done) => {
      chai.request(server)
        .get(`/api/tasks/allmembersof/${taskID}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res.status).to.equal(200) // Check if the status is Ok
            expect(res.body).to.have.all.keys('status', 'result')
            expect(res.body.status).to.equal('Ok')
            console.log(res.body)
            done()
          }
        })
    }).timeout(5000)

    it('should update a todo board', (done) => {
          chai.request(server)
            .put(`/api/todo/${todoboardID}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Updated' })
            .end((err, res) => {
              if (err) {
                done(err)
              } else {
                expect(res.body).to.have.all.keys('status', 'message')
                expect(res.body.status).to.equal('Ok')
                expect(res.body.message).to.equal('Todo board updated.')
                done()
              }
            })
    }).timeout(5000)

    it('should remove todo board', (done) => {
      chai.request(server)
        .delete(`/api/todo/${todoboardID}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            done(err)
          } else {
            expect(res.status).to.equal(200)
            expect(res.body).to.have.all.keys('status', 'message')
            expect(res.body.status).to.equal('Ok')
            expect(res.body.message).to.equal('Todo Board deleted.')
            done()
          }
        })
    }).timeout(5000)

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
            done()
          }
        })
    }).timeout(5000)

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

    it('get task by id')
    it('remove task')
    it('get tasks of todo')
    it('get todo by id')
  })
})
