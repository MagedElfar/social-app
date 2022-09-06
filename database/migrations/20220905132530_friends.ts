export const up = function (knex:any) {
    return knex.schema
        .createTable("friends", function (table:any) {
            table.increments();
            table.integer("user_1").unsigned();
            table.integer("user_2").unsigned();
            table.enu("status", ["pending", "accepted", "rejected"]).defaultTo("pending");
            table.foreign("user_1").references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
            table.foreign("user_2").references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
        })
        .then(console.log("table are created"));
    };

export const down = function (knex:any) {
return knex.schema
    .dropTable("friends")
};
