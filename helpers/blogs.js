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
  .select('users.username')
  .where({user_id : id})



module.exports = { createBlog, deleteBlog, getBlog, getBlogUser};
