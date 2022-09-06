"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const up = function (knex) {
    return knex.schema
        .createTable("users", function (table) {
        table.increments();
        table.string("username").unique().notNullable();
        table.string("email").unique().notNullable();
        table.string("password").notNullable();
        table.integer("wp_id").unsigned().notNullable();
        table.boolean("onboard").notNullable().defaultTo(0);
        table.boolean("is_verified").notNullable().defaultTo(0);
        table.timestamps(true, true);
    })
        .createTable("users_meta", function (table) {
        table.increments();
        table.integer("user").unsigned();
        table.string("insurance_id").notNullable();
        table.string("address").notNullable();
        table.dateTime("purchase_date").notNullable();
        table.timestamps(true, true);
        table.foreign("user").references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
    })
        .createTable("tokens_list", function (table) {
        table.increments();
        table.integer("user").unsigned();
        table.string("token", 2500);
        table.timestamps(true, true);
        table.foreign("user").references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
    })
        .createTable("verification_codes", function (table) {
        table.increments();
        table.string("code").notNullable();
        table.integer("token").unsigned();
        table.timestamps(true, true);
        table.foreign("token").references("id").inTable("tokens_list").onUpdate("CASCADE").onDelete("CASCADE");
    })
        .createTable("teeth_condition", function (table) {
        table.increments();
        table.integer("user").unsigned();
        table.enu("teeth_condition", ["healthy", "sensitive", "gum bleeding", "yellowish"]).notNullable();
        table.enu("periodontal_condition", ["healthy", "bleeding", "abscess", "abscess + bleeding"]).notNullable();
        table.enu("plague", ["healthy", "plague"]).notNullable();
        table.timestamps(true, true);
        table.foreign("user").references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
    })
        .createTable("analytics", function (table) {
        table.increments();
        table.integer("user").unsigned();
        table.dateTime("date").notNullable();
        table.integer("brushing_time").notNullable();
        table.integer("coverage").notNullable();
        table.integer("pressure").notNullable();
        table.timestamps(true, true);
        table.foreign("user").references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
    })
        .createTable("remainders", function (table) {
        table.increments();
        table.integer("user").unsigned();
        table.boolean("recurring").notNullable().defaultTo(0);
        table.integer("interval").nullable();
        table.dateTime("date_from").nullable();
        table.dateTime("date_to").nullable();
        table.timestamps(true, true);
        table.foreign("user").references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE");
    })
        .createTable("schedules", function (table) {
        table.increments();
        table.integer("remainder").unsigned();
        table.dateTime("execution_date").notNullable();
        table.string("registration_token", 250).notNullable();
        table.timestamps(true, true);
        table.foreign("remainder").references("id").inTable("remainders").onUpdate("CASCADE").onDelete("CASCADE");
    })
        .createTable("insurance_companies", function (table) {
        table.string("id").unique().primary();
        table.string("name").nullable();
        table.string("logo").nullable();
        table.string("color").nullable();
        table.timestamps(true, true);
    })
        .then(console.log("tables are created"));
};
exports.up = up;
const down = function (knex) {
    return knex.schema
        .dropTable("users")
        .dropTable("users_meta")
        .dropTable("tokens_list")
        .dropTable("verification_codes")
        .dropTable("on_board")
        .dropTable("analytics")
        .dropTable("remainders")
        .dropTable("schedules")
        .dropTable("insurance_companies");
};
exports.down = down;
