const router = require("express").Router();
const categoryController = require("../controller/categoryController");
const authenticate = require("../middleware/authenticate");

router
  .route("/")
  .get(categoryController.getCategories);

router 
  .route('/createPost')
  .post(authenticate, categoryController.createCategoryPost)

router
  .route('/deletePost')
  .delete(authenticate, categoryController.deleteCategoryPost)

router 
  .route('/comment/post')
  .post(authenticate, categoryController.createCategoryComment)

router
  .route("/comment/delete")
  .delete(authenticate, categoryController.deleteCategoryComment)

router
  .route("/:id")
  .get(categoryController.getPostFromCategory)

router
  .route("/comments/:id")
  .get(categoryController.getCategoryComments);



module.exports = router;
