const router = require("express").Router();
const personalController = require("../controller/personalController");
const authenticate = require("../middleware/authenticate");

router
  .route("/post")
  .post(authenticate, personalController.postStatus);


router
  .route("/delete")
  .delete(authenticate, personalController.deleteStatus);


module.exports = router;
