export const up = function (knex:any) {
    return knex.schema
        .createTable("comments", function (table:any) {
            table.increments();
            table.integer("user").unsigned();
            table.integer("post").unsigned();
            table.string("comment").nullable();
            table.foreign("user").references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
            table.foreign("post").references("id").inTable("posts").onUpdate("CASCADE").onDelete("CASCADE");
            table.timestamps(true, true);
        })
        .then(console.log("table are created"));
    };

export const down = function (knex:any) {
return knex.schema
    .dropTable("comments")
};
