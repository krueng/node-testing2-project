const employees = [
  { employee_name: 'Ahmad' },
  { employee_name: 'Jim' },
  { employee_name: 'Matt' },
  { employee_name: 'Maya' },
  { employee_name: 'Edgar' },
]

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('employees')
    .truncate()
    .then(function() {
      return knex('employees').insert(employees);
    });
};

exports.employees = employees
