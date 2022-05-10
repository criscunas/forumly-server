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

exports.getFollowers = async (req,res) => {

  const id = req.user.id;

  const followers = await 
  Following.getUserFollowers(id)
  .catch(err => {
    res.json({
      err:err
    })
  })

  const following = await 
  Following.getUserFollowing(id)
  .catch(err => {
    res.json({
      err:err
    })
  })

  const obj = {
    following : following,
    followers : followers
  }

  res.json(obj)

}

exports.publicFollowers = async (req, res) => {
  
  const {id} = req.params;

  const obj = {
    user_account_id : id
  }

  Following
    .getPublicFollowers(obj)
    .then(data => {
      res.json(data)
    })
    .catch((err) => {
      res.json({
        err: err,
      });
  });
};