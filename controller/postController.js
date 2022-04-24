const Posts = require("../helpers/posts");

exports.createPost = (req, res) => {
  const { content, thread_id } = req.body;

  let newPost = {
    content: content,
    user_account_id: req.user.id,
    thread_id: thread_id,
  }

  Posts.createPost(newPost).then(() => {
      res.status(201).json({
        success: "New Post Created!",
      })
    })
    .catch(err => {
      res.json({
        err:err
      })
    })
};

exports.deletePost = (req,res) => {
  
  const {post_id} = req.body;

  let obj = {
    user_account_id: req.user.id,
    id: post_id
  }
  
  Posts
    .deleteUserPost(obj)
    .then(() => {
      res.json({
        success: 'Deleted Post'
      })
    })
}