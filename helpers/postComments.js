const knex = require("../db");
const commentTable = "postComments";
const userTable = "users";

const createPostComment = (obj) => knex(commentTable).insert(obj)

const deletePostComment = (obj) =>
  knex(commentTable)
  .where(obj)
  .del()

const getPostComments = (id) =>
  knex
    .select(
      "postComments.comment_body",
      "postComments.created",
      "postComments.id",
      "users.username",
      "users.img_path"
    )
    .from(commentTable)
    .where("post_id", id)
    .join("users", function () {
      this.on("postComments.user_account_id", "user_id");
    });

const getThreadComments = (id) => 
    knex(commentTable)
    .where("thread_id", id)

module.exports = {createPostComment, deletePostComment, getPostComments, getThreadComments}
