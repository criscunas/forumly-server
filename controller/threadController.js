const knex = require("../db");
const Thread = require("../helpers/threads");


exports.createThread = (req, res) => {
  const { thread_subject, initial_post} = req.body;

  if (!thread_subject) {
    res.json({
      err: "Thread Subject Missing",
    });
  }

  if (!initial_post) {
    res.json({
      err: "Post Missing",
    });
  }

  const threadObj = {
    user_account_id: req.user.id,
    thread_subject: thread_subject,
    initial_post: initial_post,
  };

  Thread.createNewThread(threadObj).then(() => {
    res.status(201).json({
      success: "New Thread Created",
    });
  });
};

exports.deleteThread = (req,res) => {
  
  const {thread_id} = req.body;

  let threadObj = {
    id : thread_id ,
    user_account_id: req.user.id
  }

  Thread
    .deleteThread(threadObj)
    .then(() => {
      res.json({
        success : "Thread Deleted"
      })
    })
    .catch(err => {
      res.json({
        err: err
      })
    })
}

exports.getAll = (req,res) => {

  Thread
    .getAllThreads()
    .then((data) => {
      res.json(data)
    })
    .catch(err => {
      res.json({
        err: err
      })
    })
}

exports.allThreadPosts = async (req,res) => {

  const {id} = req.params;

  const main = await Thread
    .getThread(id)
    .catch(err => {
      console.log(err)
    })

  const posts = await Thread
    .getThreadContent(id)
    .catch(err => {
      res.json({
        err:err
      })
    })

  res.json({
    thread : main, 
    posts: posts
  })
}