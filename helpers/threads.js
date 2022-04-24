const knex = require("../db");
const threadTable = "threads";
const userTable = "users"

const createNewThread = (obj) => knex(threadTable).insert(obj);

const deleteThread = (obj) => knex(threadTable).where(obj).del()

const getThread = (id) =>
  knex
    .select(
      "threads.thread_subject",
      "threads.initial_post",
      "threads.created",
      "users.username"
    )
    .from(threadTable)
    .where("id", id)
    .join(userTable, function () {
      this.on("threads.user_account_id", "user_id");
    })


const getAllThreads = () =>
  knex
    .select(
      "users.username",
      "users.user_id",
      "threads.thread_subject",
      "threads.created",
      "threads.initial_post",
      "threads.id",
      "users.img_path"
    )
    .from(userTable)
    .join(threadTable,{"threads.user_account_id": "users.user_id" })
    .orderBy('threads.created', 'desc')

const getThreadContent = (id) =>
  knex
    .select(
      "posts.content",
      "posts.created",
      "posts.id",
      "users.username",
      "posts.user_account_id"
    )
    .from(threadTable + " " + "as t")
    .join("posts", function () {
      this.on("posts.thread_id", "=", "t.id");
    })
    .join("users", function () {
      this.on("users.user_id", "=", "posts.user_account_id");
    })
    .where("posts.thread_id", id)
    .orderBy("posts.created", "desc")

module.exports = { createNewThread, getAllThreads, deleteThread, getThreadContent, getThread };
