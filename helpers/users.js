const knex = require("../db");
const userTable = "users";
const personalTable = "personals";
const bioTable = "blogs";
const threadTable = "threads"
const postsTable = "posts";

const getUserStatus = (id) =>
  knex(personalTable)
    .where("personals.user_account_id", id)
    

const userBlogs = (id) => 
    knex(bioTable)
    .where({
      user_account_id: id
    })

const findUser = (username) => 
  knex(userTable)
  .where({
    username : username
  })

const updateBio = (id, bio) => 
  knex(userTable)
  .where('user_id', id)
  .update({
    bio: bio
  })

const userThreads = (obj) => 
  knex(threadTable)
  .where(obj)


const userPosts = (obj) => 
  knex(postsTable)
  .where(obj)

module.exports = { findUser, getUserStatus, userBlogs, updateBio, userThreads, userPosts };
