const knex = require("../db");
const tableName = "posts";

const createPost = (obj) => knex(tableName).insert(obj);

const deleteUserPost = (obj) => 
  knex(tableName)
  .where(obj)
  .del()

const getPost = (id) =>
  knex
    .select(
      "posts.content",
      "posts.id",
      "posts.created",
      "users.username",
      "users.img_path",
    )
    .from(tableName)
    .where("id", id)
    .join("users", function () {
      this.on("posts.user_account_id", "user_id");
    });


module.exports = { createPost, deleteUserPost, getPost };
