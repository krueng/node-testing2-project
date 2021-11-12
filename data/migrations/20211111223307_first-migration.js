exports.up = function (knex) {
    return knex.schema.createTable("employees", tbl => {
        tbl.increments();

        tbl.string("employee_name", 255).unique().notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("employees");
};
