const blogComments = require('../helpers/blogComments');

exports.createBlogComment = (req,res) => {

  const {blog_id, comment} = req.body;

  let obj = {
    blog_id: blog_id,
    comment_body : comment, 
    user_account_id: req.user.id
  }

  blogComments
    .createComment(obj)
    .then(() => {
      res.json({
        success: 'Created.'
      })
    })
}

exports.deleteBlogComment = (req,res) => {

  const {comment_id} = req.body;

  let obj = {
    user_account_id : req.user.id,
    id : comment_id
  }

  blogComments
    .deleteComment(obj)
    .then(() => {
      res.json({
        success : 'Comment deleted.'
      })
    })

}