export const up = function (knex:any) {
    return knex.schema
        .createTable("post_images", function (table:any) {
            table.increments();
            table.integer("post").unsigned();
            table.string("image").nullable();
            table.foreign("post").references("id").inTable("posts").onUpdate("CASCADE").onDelete("CASCADE");
            table.timestamps(true, true);
        })
        .then(console.log("table are created"));
    };

export const down = function (knex:any) {
return knex.schema
    .dropTable("post_images")
};
