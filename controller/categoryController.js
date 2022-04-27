const knex = require("../db");
const category = require('../helpers/category');


exports.getPostFromCategory = async (req,res) => {
  
  const {id} = req.params;

  const title = await knex('category').where('id', '=', id)

  const posts = await category.getPostFromCategory(id)

  res.json({
    title : title[0].title,
    posts:posts
  });

}

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

  if (!post) {
    res.json({
      err: "Post Missing",
    });
  }

  if (!category_id) {
    res.json({
      err: "id missing",
    });
  }

  if (!title) {
    res.json({
      err: "Title Missing",
    });
  }


  let obj = {
    category_id : category_id,
    title : title, 
    post: post,
    user_account_id: req.user.id
  }
  
  category
    .createCategoryPost(obj)
    .catch(err => {
      res.json(err)
    })

  res.send('Posted')
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

  if (!post_id) {
    res.json({
      err: "Post id Missing",
    });
  }

  if (!comment_body) {
    res.json({
      err: "Comment body missing",
    });

  }

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
  const {id} = req.body;

  let obj = {
    user_account_id: req.user.id,
    id : id,
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

exports.getCategoryComments = (req,res) => {
  
  const {id} = req.params

  category  
    .getCategorizedComments(id)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json({
        err : err
      })
    })
}