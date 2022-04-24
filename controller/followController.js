const Following = require('../helpers/followings');

exports.followerUser = (req,res) => {

  const {user_account_id} = req.body

  let obj = {
    follower_id : req.user.id,
    user_account_id: user_account_id
  }

  Following
    .createFollow(obj)
    .then(() => {
      res.send('User followed!')
    })
    .catch(err => {
      res.json({
        err:err
      })
    }) 
}

exports.unfollowUser = (req,res) => {
  
  const {user_account_id} = req.body;

  let obj = {
    follower_id: req.user.id,
    user_account_id: user_account_id,
  };

  Following
    .createUnfollow(obj)
    .then(() => {
      res.send('User unfollowed')
    })
    .catch(err => {
      res.json ({
        err : err
      })
    })
  
}