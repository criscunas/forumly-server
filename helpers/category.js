const knex = require("../db");
const categorizedPosts = "categorized_post";
const categorizedComment = "categorized_comments";
const userTable = "users";

const createCategoryPost = (obj) =>
  knex(categorizedPosts)
  .insert(obj)

const deleteCategoryPost = (obj) => 
  knex(categorizedPosts)
  .where(obj)
  .del()

const createCategoryComment = (obj) => 
  knex(categorizedComment)
  .insert(obj) 

const deleteCategoryComment = (obj) => 
  knex(categorizedComment)
  .where(obj)
  .del()

const getCategoryComments = (obj) => 
  knex(categorizedComment)
  .where(obj)

const getPostFromCategory = (id) =>
  knex(categorizedPosts)
    .select(
      "categorized_post.title",
      "post",
      "categorized_post.id",
      "users.username",
      "users.img_path",
      "categorized_post.created",
      "categorized_post.user_account_id",
    )
    .join(userTable, function () {
      this.on("user_account_id", "users.user_id");
    })
    .join('category as c', function () {
      this.on("c.id", "=", "categorized_post.category_id")
    })
    .where("categorized_post.category_id", id)
    .orderBy("categorized_post.created", "desc");

const getCategorizedComments = (id) =>
  knex(categorizedComment + " " + "as c")
    .select(
      "comment_body",
      "c.created",
      "id",
      "user_account_id",
      "u.username",
      "u.img_path"
    )
    .join("users as u", function () {
      this.on("u.user_id", "c.user_account_id")
    })
    .where("c.post_id", id)

module.exports = {createCategoryPost, deleteCategoryPost, deleteCategoryComment, createCategoryComment, getCategoryComments, getPostFromCategory, getCategorizedComments }