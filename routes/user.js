const router = require("express").Router();
const userController = require("../controller/userController");
const authenticate = require('../middleware/authenticate')

router
  .route("/signup")
  .post(userController.addUser);

router
  .route("/login")
  .post(userController.login)

router
  .route("/profile/:username")
  .get(userController.getUserAll)

router
  .route('/bio')
  .post(authenticate, userController.userBio)

router
  .route('/threads')
  .get(authenticate, userController.getUserThreads)
  
router
  .route('/posts')
  .get(authenticate, userController.getUserPosts)


module.exports = router;