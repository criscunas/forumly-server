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
  .route("/profile")
  .get(authenticate, userController.getUserAll)

router
  .route('/bio')
  .post(authenticate, userController.userBio)

router
  .route('/:username/threads')
  .get(userController.getUserThreads)
  
router
  .route('/:username/posts')
  .get(userController.getUserPosts)

router
  .route('/:username/blogs')
  .get(userController.getUserBlogs)

router
  .route('/feed')
  .get(authenticate, userController.getUserFeed)

router
  .route("/public/:username")
  .get(userController.getPublicProfile)

router
  .route("/:username/personals")
  .get(userController.getUserPersonals);

router
  .route("/uploadImage")
  .post(authenticate,userController.uploadImage)

router 
  .route("/relationships")
  .get(authenticate, userController.getFollowRelationships)

module.exports = router;