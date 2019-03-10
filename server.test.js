const request = require('supertest')
const app = require('./app')
const dataRequest = require('./examples/example-request.json')
const dataResponse = require('./examples/example-response.json')

describe('GET /', () => {
  test('responds with 200', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .then(() => done())
  })
})

describe('POST /flights', () => {
  test('responds with correct JSON', (done) => {
    request(app)
      .post('/flights')
      .send(dataRequest)
      .expect(200)
      .then(res => {
        expect(res.body).toEqual(dataResponse)
        done()
      })
  })
})