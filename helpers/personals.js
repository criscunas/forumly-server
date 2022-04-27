const knex = require("../db");
const tableName = "personals";

const postStatus = (obj) => knex(tableName).insert(obj)

const deleteStatus = (obj) => knex(tableName).where(obj).del()

const getPersonals = (id) => 
  knex(tableName)
  .where('user_account_id', "=", id)
  .orderBy('created', 'desc')

module.exports = {postStatus,deleteStatus, getPersonals}