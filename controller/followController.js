const Following = require('../helpers/followings');

exports.followerUser = async (req,res) => {

  const {id} = req.body

  let obj = {
    follower_id : req.user.id,
    user_account_id: id
  }

  const rel = await Following.findFollow(obj)

  if(rel.length === 1) {
    res.json({
      err : "Already Following"
    })
  }

  else {
    Following
      .createFollow(obj)
      .then(() => {
        res.json({
          success : 'Followed User'
        })
      })
    }
}

exports.unfollowUser = (req,res) => {
  
  const {id} = req.body;

  let obj = {
    follower_id: req.user.id,
    user_account_id: id
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