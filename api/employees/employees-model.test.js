const employee = require('./employees-model')
const db = require('../../data/dbConfig')
const { employees } = require('../../data/seeds/001-employees')

test('is testing environment', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

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

describe('employee model',() => {
  describe('getAll()', () => {
    let data
    beforeEach(async () => {
      data = await employee.getAll()
    })
    test('resolves all employees in the db', async () => {
      expect(data.length).toBe(5)
      expect(data).toHaveLength(5)
    })
    test('resolves the correct shapes', async () => {
      expect(data).toMatchObject(employees)
      expect(data).toEqual([
        {
          "employee_name": "Ahmad",
          "id": 1
        },
        {
          "employee_name": "Jim",
          "id": 2
        },
        {
          "employee_name": "Matt",
          "id": 3
        },
        {
          "employee_name": "Maya",
          "id": 4
        },
        {
          "employee_name": "Edgar",
          "id": 5
        }
      ])
    })
  })
  describe('getById()', () => {
    test('returns the correct employee', async () => {
      const data = await employee.getById('1')
      expect(data).toMatchObject({ id: 1, employee_name: 'Ahmad' })
    })
  })
  describe('insert()', () => {
    test('insert a new employee', async () => {
      const data = await employee.insert({ employee_name: 'Susan' })
      expect(data).toMatchObject({ id: 6, employee_name: 'Susan' })
    })
  })
  describe('remove()', () => {
    test('remove an employee', () => {
      // const data = employee.remove('2')
      // expect(data).toBe(2)
    })
  })
})
