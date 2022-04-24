const Personal = require('../helpers/personals');

exports.postStatus = (req,res) => {

  const {personal_post, id} = req.body

  const postObj = {
    personal_post : personal_post,
    user_account_id: id
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
  
  const {id, user_account_id } = req.body;

  let obj = {
    id: id,
    user_account_id : user_account_id
  }

  Personal
    .deleteStatus(obj)
    .then(() => {
      res.send('Deleted Status')
    })
}