const configs = require("./database/knexfile").development;
const knex = require("knex");
const connection = knex(configs);

module.exports = connection;
