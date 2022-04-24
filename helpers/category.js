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

module.exports = {createCategoryPost, deleteCategoryPost, deleteCategoryComment, createCategoryComment, getCategoryComments }