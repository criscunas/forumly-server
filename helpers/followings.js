const knex = require("../db");
const followingTable = "followings";
const usersTable = "users";

const findFollow = (obj) => 
  knex(followingTable)
  .where(obj)
  
const createFollow = (obj) => 
  knex(followingTable)
  .insert(obj)
  
const createUnfollow = (obj) => 
  knex(followingTable)
  .where(obj)
  .del()

const getUserFollowing = (id) => 
  knex(usersTable)
    .select(
      'users.username', 
      'users.user_id', 
      'users.img_path',
      'users.bio'
      )
    .join(followingTable, function () {
      this.on("followings.user_account_id", "users.user_id").andOn(
        "follower_id" , id
      )
    })

const getUserFollowers = (id) =>
  knex(followingTable)
  .select(
    "users.username",
    "users.username",
    "users.bio"
  )
  .join(usersTable, function () {
    this.on("followings.user_account_id", id).andOn(
      "followings.follower_id",
      "users.user_id"
    );
  })
  
const getPublicFollowers = (obj) => 
  knex(followingTable)
  .where(obj)



module.exports = {findFollow, createUnfollow, createFollow, getUserFollowing, getUserFollowers, getPublicFollowers}