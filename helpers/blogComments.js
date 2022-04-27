const knex = require("../db");
const blogCommentTable = "blogComments";

const createComment = (obj) => knex(blogCommentTable).insert(obj);

const deleteComment = (obj) => knex(blogCommentTable).where(obj).del();

const getBlogComments = (id) =>
  knex(blogCommentTable)
  .where({
    blog_id: id,
  });

module.exports = { createComment, deleteComment, getBlogComments };
