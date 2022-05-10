const knex = require("../db");
const blogCommentTable = "blogComments";

const createComment = (obj) => knex(blogCommentTable).insert(obj);

const deleteComment = (obj) => knex(blogCommentTable).where(obj).del();

const getBlogComments = (id) =>
  knex(blogCommentTable)
  .select(
      "blogComments.id",
      "blogComments.comment_body",
      "blogComments.created",
      "u.user_id",
      "u.username",
      "u.img_path"
  )
  .join("users as u", function () {
    this.on("u.user_id", "user_account_id")
  })
  .where({
    blog_id: id,
  });

module.exports = { createComment, deleteComment, getBlogComments };
