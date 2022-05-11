const knex = require("../db");
const postComments = require("../helpers/postComments");

exports.createPostComment = (req,res) => {

  const {comment_body, post_id, thread_id} = req.body;

  if (!post_id) {
    res.json({
      err: "Post id Missing",
    });
  }

  if (!comment_body) {
    res.json({
      err: "Comment body missing",
    });
  }

  if (!thread_id) {
    res.json({
      err: "Thread id missing."
    });
  }



  let obj = {
    comment_body: comment_body,
    user_account_id: req.user.id,
    post_id: post_id,
    thread_id: thread_id
  }

  postComments
    .createPostComment(obj)
    .then(() => {
      res.json({
        success: "Comment posted"
      })
    })
    .catch(err => {
      res.json({
        err: err
      })
    })
}


exports.deletePostComment = (req, res) => {
  const {comment_id } = req.body;

  let obj = {
    id: comment_id,
    user_account_id: req.user.id,
  };

  postComments
    .deletePostComment(obj)
    .then(() => {
      res.json({
        success: "Comment Deleted",
      });
    })
    .catch((err) => {
      res.json({
        error: err,
      });
    });
};











