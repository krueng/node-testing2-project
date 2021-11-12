const server = require('./server')
const request = require('supertest')
const db = require('../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

describe('[GET] /api/employees', () => {
  test('responds with all the employees', async () => {
    const res = await request(server).get('/api/employees')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(5)
  })
})

describe('[GET] /api/employees/:id', () => {
  test('responds with Ahmad', async () => {
    const res = await request(server).get('/api/employees/1')
    expect(res.body).toMatchObject({ id: 1, employee_name: 'Ahmad' })
  })
})

describe('[POST] /api/employees', () => {
  test('responds with new employee', async () => {
    const res = await request(server)
      .post('/api/employees').send({ employee_name: 'Susan' })
    expect(res.body).toMatchObject({ id: 6, employee_name: "Susan" })
  })
  test('responds with status 201', async () => {
    const res = await request(server)
      .post('/api/employees').send({ employee_name: 'Susan' })
    expect(res.status).toBe(201)
  })
})
