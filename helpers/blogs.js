const knex = require("../db");
const blogTable = "blogs";
const userTable = 'users';


const createBlog = (obj) => knex(blogTable).insert(obj);

const deleteBlog = (obj) => knex(blogTable).where(obj).del();

const getBlog = (id) => knex(blogTable).where({
  id: id
})

const getBlogUser = (id) => 
  knex(userTable)
  .select('users.username', 'users.img_path')
  .where({user_id : id})

const getBlogsFromUser = (id) => 
  knex(blogTable)
  .where("user_account_id", "=", id)

const allBlogs = () => 
  knex(blogTable)

module.exports = { createBlog, deleteBlog, getBlog, getBlogUser, getBlogsFromUser, allBlogs};
