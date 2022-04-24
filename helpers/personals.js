const knex = require("../db");
const tableName = "personals";

const postStatus = (obj) => knex(tableName).insert(obj)

const deleteStatus = (obj) => knex(tableName).where(obj).del()

module.exports = {postStatus,deleteStatus}