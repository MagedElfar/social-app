"use strict";
exports.seed = function (knex) {
    return knex('insurance_companies').del()
        .then(function () {
        return knex('insurance_companies').insert([
            {
                id: "123456",
                name: "Aetna",
                logo: "https://upload.wikimedia.org/wikipedia/commons/7/70/Example.png",
                color: "#000"
            },
            {
                id: "123145",
                name: "Aetna_2",
                logo: "https://upload.wikimedia.org/wikipedia/commons/7/70/Example.png",
                color: "#fff"
            }
        ]);
    });
};
