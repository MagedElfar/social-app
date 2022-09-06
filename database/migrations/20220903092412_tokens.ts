export const up = function (knex:any) {
    return knex.schema
        .createTable("tokens", function (table:any) {
            table.increments();
            table.integer("user").unsigned();
            table.string("token" , 2500);
            table.timestamps(true, true);
            table.foreign("user").references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
        })
        .then(console.log("table are created"));
    };

export const down = function (knex:any) {
return knex.schema
    .dropTable("tokens")
};
