export const up = function (knex:any) {
    return knex.schema
        .createTable("posts", function (table:any) {
            table.increments();
            table.integer("user").unsigned();
            table.string("content").nullable();
            table.foreign("user").references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
            table.timestamps(true, true);
        })
        .then(console.log("table are created"));
    };

export const down = function (knex:any) {
return knex.schema
    .dropTable("posts")
};
