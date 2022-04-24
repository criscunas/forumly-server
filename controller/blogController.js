const Blogs = require("../helpers/blogs");
const BlogComments = require('../helpers/blogComments');

exports.newBlogPost = (req, res) => {
  const { title, content } = req.body;

  const blogObj = {
    title : title,
    content: content, 
    user_account_id: req.user.id,
  };

  Blogs.createBlog(blogObj)
    .then(() => {
      res.send("New Blog Post Created");
    })
    .catch((err) => {
      res.json({
        error: err,
      });
    });
};

exports.deleteBlogPost = (req, res) => {
  const { id } = req.body;

  let blogObj = {
    id: id,
    user_account_id: req.user.id,
  };

  Blogs.deleteBlog(blogObj).then(() => {
    res.send("Deleted Blog Post ");
  });
};

exports.getBlog = async (req,res) => {

  const {id} = req.params;

  const blog = await Blogs.getBlog(id);
  
  const username = await Blogs.getBlogUser(blog[0].user_account_id)

  const comments = await BlogComments.getBlogComments(id)

  res.json({
    user: username, 
    post : blog,
    comments : comments,
  })
}