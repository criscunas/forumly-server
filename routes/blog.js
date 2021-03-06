const router = require("express").Router();
const blogController = require("../controller/blogController");
const blogCommentController = require('../controller/blogCommentController');
const authenticate = require('../middleware/authenticate');

router
  .route("/new")
  .post(authenticate, blogController.newBlogPost);

router
  .route("/delete")
  .delete(authenticate, blogController.deleteBlogPost);

router
  .route('/find/:id')
  .get(blogController.getBlog)

router
  .route('/comment')
  .post(authenticate, blogCommentController.createBlogComment)

router
  .route('/comment/delete')
  .delete(authenticate, blogCommentController.deleteBlogComment)

router  
  .route('/all')
  .get(blogController.allBlogs)

module.exports = router;
