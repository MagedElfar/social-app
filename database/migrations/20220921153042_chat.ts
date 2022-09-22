export const up = function (knex:any) {
    return knex.schema
        .createTable("chat_rooms", function (table:any) {
            table.increments();
            table.enu("type", ["private", "group"]).defaultTo("privet");
            table.timestamps(true, true);
        })
        .createTable("room_members", function (table:any) {
            table.increments();
            table.integer("room").unsigned();
            table.integer("user").unsigned();
            table.foreign("user").references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
            table.foreign("room").references("id").inTable("chat_rooms").onUpdate("CASCADE").onDelete("CASCADE");
            table.timestamps(true, true);
        })
        .createTable("messages", function (table:any) {
            table.increments();
            table.integer("sender").unsigned();
            table.integer("room").unsigned();
            table.string("message").nullable();
            table.enu("type", ["text", "file" , "image"]).defaultTo("text");
            table.foreign("sender").references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
            table.foreign("room").references("id").inTable("chat_rooms").onUpdate("CASCADE").onDelete("CASCADE");
            table.timestamps(true, true);
        })
        .createTable("receivers", function (table:any) {
            table.increments();
            table.integer("receiver").unsigned();
            table.integer("message").unsigned();
            table.boolean("is_read").notNullable().defaultTo(0);
            table.foreign("receiver").references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
            table.foreign("message").references("id").inTable("messages").onUpdate("CASCADE").onDelete("CASCADE");
            table.timestamps(true, true);
        })
        .then(console.log("table are created"));
    };

export const down = function (knex:any) {
return knex.schema
    .dropTable("chat_rooms")
    .dropTable("room_members")
    .dropTable("messages")
    .dropTable("receivers")
};
