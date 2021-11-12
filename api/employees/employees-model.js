const db = require('../../data/dbConfig.js')

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById,
}

function getAll() {
  return db('employees')
}

function getById(id) {
  return db('employees').where('id', id ).first()
}

async function insert(employee) {
  return db('employees').insert(employee)
    .then(([id]) => {
      return getById(id)
    })
}

async function update(id, changes) {
  return db('employess')
    .where(id)
    .update(changes)
}

function remove(id) {
  return db('employess')
    .where(id)
    .delete()
}
