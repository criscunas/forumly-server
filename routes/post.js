const router = require("express").Router();
const postController = require("../controller/postController");
const commentController = require("../controller/commentController");
const authenticate = require("../middleware/authenticate");


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


module.exports = router;
