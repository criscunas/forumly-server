const knex = require("../db");
const tableName = "posts";

const createPost = (obj) => knex(tableName).insert(obj);

const deleteUserPost = (obj) => 
  knex(tableName)
  .where(obj)
  .del()

module.exports = { createPost, deleteUserPost };
