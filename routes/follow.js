const router = require("express").Router();
const followController = require("../controller/followController");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .post(authenticate, followController.followerUser);

router
  .route("/unfollow")
  .delete(authenticate, followController.unfollowUser);

module.exports = router;
