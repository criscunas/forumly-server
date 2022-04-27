const knex = require("../db");
const userTable = "users";
const personalTable = "personals";
const bioTable = "blogs";
const threadTable = "threads"
const postsTable = "posts";

const getUserStatus = (id) =>
  knex(personalTable)
    .where("personals.user_account_id", id)
    .orderBy("personals.created", "desc");

    

const userBlogs = (id) => 
    knex(bioTable)
    .where({
      user_account_id: id
    })
    .orderBy("blogs.created", "desc");


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
  .orderBy("threads.created", "desc");



const userPosts = (id) =>
  knex
    .select(
      "threads.thread_subject",
      "threads.initial_post",
      "posts.thread_id",
      "posts.id",
      "posts.content",
      "threads.created",
      "users.username"
    )
    .from(postsTable)
    .join(threadTable, function () {
      this.on("posts.user_account_id", id).andOn(
        "posts.thread_id",
        "threads.id"
      )
    })
    .join(userTable, function () {
      this.on("threads.user_account_id", "=", "users.user_id")
    })
    .orderBy("posts.created", 'desc')


const userFeed = (id) => 
  knex("personals as p")
    .select("p.personal_post", "p.created", "pu.img_path", "pu.username")
    .join("followings as f", function () {
      this.on("f.user_account_id", "p.user_account_id");
    })
    .join("users as you", function () {
      this.on("you.user_id", "f.follower_id");
    })
    .join("users as pu", function () {
      this.on("pu.user_id", "p.user_account_id");
    })
    .where("you.user_id", id)
    .orderBy("p.created", "desc")

const getPublicProfile = (username) => 
    knex(userTable)
      .select(
        'users.username',
        'users.user_id',
        'users.bio',
        'users.img_path',
        'users.created'
      )
    .where('users.username' , "=", username)

module.exports = { findUser, getUserStatus, userBlogs, updateBio, userThreads, userPosts, userFeed, getPublicProfile };
