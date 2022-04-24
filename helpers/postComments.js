const knex = require("../db");
const commentTable = "postComments";
const userTable = "users";

const createPostComment = (obj) => knex(commentTable).insert(obj)

const deletePostComment = (obj) =>
  knex(commentTable)
  .where(obj)
  .del()

module.exports = {createPostComment, deletePostComment}
