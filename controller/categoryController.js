const knex = require("../db");
const category = require('../helpers/category');

exports.getCategories = (req,res) => {

  knex('category')
    .then((data) => {
      res.json(data)
    })
    .catch(err => {
      res.send('Error')
    })
}

exports.createCategoryPost = (req,res) => {

  const {category_id, title, post} = req.body;

  let obj = {
    category_id : category_id,
    title : title, 
    post: post,
    user_account_id: req.user.id,
  }

  category
    .createCategoryPost(obj)
    .then(() => {
      res.status(201).send('Post created')
    })
    .catch(err => {
      res.json(err)
    })
}

exports.deleteCategoryPost = (req, res) => {
  
  const { post_id } = req.body;

  let obj = {
    user_account_id: req.user.id,
    id : post_id
  };

  category
    .deleteCategoryPost(obj)
    .then(() => {
      res.send("Post deleted");
    })
    .catch((err) => {
      res.json({
        err: err
      });
    });
};


exports.createCategoryComment = (req, res) => {
  const { post_id, comment_body} = req.body;

  let obj = {
    comment_body: comment_body,
    post_id: post_id,
    user_account_id: req.user.id,
  };

  category
    .createCategoryComment(obj)
    .then(() => {
      res.status(201).send("Comment Posted");
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.deleteCategoryComment = (req, res) => {
  const {comment_id} = req.body;

  let obj = {
    user_account_id: req.user.id,
    id : comment_id,
  };

  category
    .deleteCategoryComment(obj)
    .then(() => {
      res.send("Comment Deleted");
    })
    .catch((err) => {
      res.json({
        err: err,
      });
    });
};