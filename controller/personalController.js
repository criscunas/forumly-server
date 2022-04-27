const Personal = require('../helpers/personals');

exports.postStatus = (req,res) => {

  const {personal_post} = req.body

  if (!personal_post) {
    res.json({
      err: "Post Missing",
    });
  }

  const postObj = {
    personal_post : personal_post,
    user_account_id: req.user.id
  }

  Personal
    .postStatus(postObj)  
    .then(() => {
      res.send('Status Posted')
    })
    .catch(err => {
      res.json({
        error :err
      })
    })
}

exports.deleteStatus = (req,res) => {
  
  const {id} = req.body;

  let obj = {
    id: id,
    user_account_id : req.user.id
  }

  Personal
    .deleteStatus(obj)
    .then(() => {
      res.send('Deleted Status')
    })
    .catch(err => {
      res.json(err)
    })
}