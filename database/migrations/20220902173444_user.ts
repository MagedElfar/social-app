export const up = function (knex:any) {
    return knex.schema
        .createTable("users", function (table:any) {
            table.increments();
            table.string("username").unique().notNullable();
            table.string("email").unique().notNullable();
            table.string("password").notNullable();
            table.string("first_name").nullable();
            table.string("last_name").nullable();
            table.string("user_img").notNullable().defaultTo("default-user-icon.jpg");
            table.boolean("is_online").notNullable().defaultTo(0);
            table.timestamps(true, true);
        })
        .then(console.log("table are created"));
    };

export const down = function (knex:any) {
return knex.schema
    .dropTable("users")
};
