const router = require("express").Router();
const postController = require("../controller/postController");
const commentController = require("../controller/commentController");
const authenticate = require("../middleware/authenticate");


router 
  .route("/:id")
  .get(postController.getPost)

router
  .route("/create")
  .post(authenticate, postController.createPost);

router
  .route('/delete')
  .delete(authenticate, postController.deletePost)

router
  .route('/comment')
  .post(authenticate, commentController.createPostComment)

router
  .route("/deleteComment")
  .delete(authenticate, commentController.deletePostComment)

router
  .route("/allcomments/:id")
  .get(postController.getPostComments)

module.exports = router;
