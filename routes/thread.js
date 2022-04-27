const router = require("express").Router();
const threadController = require("../controller/threadController");
const authenticate = require("../middleware/authenticate");

router
  .route("/create")
  .post(authenticate, threadController.createThread);

router
  .route('/all')
  .get(threadController.getAll)

router
  .route('/delete')
  .delete(authenticate, threadController.deleteThread)

router
  .route('/:id')
  .get(threadController.allThreadPosts)

module.exports = router;
