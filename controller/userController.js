require("dotenv").config();
const knex = require("../db");
const bcrypt = require("bcrypt");
const User = require("../helpers/users");
const Following = require("../helpers/followings");
const Personal = require("../helpers/personals");
const Blog = require("../helpers/blogs");


const jwt = require("jsonwebtoken");

const JWT_S = process.env.JWTS;



exports.addUser = (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.hashed_password) {
    return res.status(400).send("Missing Information");
  }

  const hash = bcrypt.hashSync(req.body.hashed_password, 10);

  let obj = {
    username: req.body.username,
    email: req.body.email,
    hashed_password: hash,
  }

  knex
    .from("users")
    .where("username", req.body.username)
    .orWhere("email", req.body.email)
    .then((data) => {
      if (data.length !== 0) {
        return res.status(400).send("errorMessage : invalid");
      } else {
        knex('users')
        .insert(obj)
        .then(() => {
          knex('users')
          .where({username: obj.username})
          .first()
          .then(user => {

            const token = jwt.sign(
              {username: user.username, id: user.user_id} ,
              JWT_S,
              {expiresIn: "24hr"}
            );
            res.json({
              username: user.username,
              auth: token,
            })
          })
          .catch(err => {
            res.json({
              err:err
            })
          })
        })
      }
    })
  };


exports.login = (req, res) => {
  const { username, hashed_password } = req.body;

  if (!username) {
    res.status(400).json({
      error: "Missing username field.",
    });
  }
  if (!hashed_password) {
    res.status(400).json({
      error: "Missing password field.",
    });
  }

  knex("users")
    .where({ username: username })
    .first()
    .then((user) => {
      const passwordCheck = bcrypt.compareSync(
        hashed_password,
        user.hashed_password
      );

      if (!passwordCheck) {
        return res.status(400).send("Invalid Password");
      }

      const token = jwt.sign(
        { username: user.username, id: user.user_id },
        JWT_S,
        { expiresIn: "24h" }
        );
      
      res.json({
        username: user.username,
        auth: token,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Invalid User Information");
    });
};

exports.getUserAll = async (req, res) => {
  const { username } = req.params;

  const userMain = await User.findUser(username).then((user) => {
    delete user.hashed_password;
    delete user.email;

    return user;
  });

  const userFollowing = await Following.getUserFollowing(userMain[0].user_id)

  const userFollowers = await Following.getUserFollowers(userMain[0].user_id)

  res.json({
    user: {
      username: userMain[0].username,
      bio: userMain[0].bio,
      img_path: userMain[0].img_path,
      created: userMain[0].created
    },
    following : userFollowing,
    followers : userFollowers
  });
};

exports.userBio = (req, res) => {
  const {bio} = req.body;

  if (!bio) {
    res.json({
      err: "Bio Missing",
    });
  }

  User.updateBio(req.user.id, bio)
    .then(() => {
      res.status(201).send("Bio updated");
    })
    .catch((err) => {
      res.json({
        err: err,
      });
    });
};

exports.getUserThreads = async (req,res) => {

  const {username} = req.params;

  const user = await User.findUser(username)

  let obj = {
    user_account_id : user[0].user_id
  }

  User
  .userThreads(obj)
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.json({
    error: err
    })
  })
} 

exports.getUserFeed = (req,res) => {

  const id = req.user.id;

  User
    .userFeed(id)
    .then((feed) => {
      res.json(feed)
    })
    .catch(err => {
      res.json({
        error : err
      })
    })
}

exports.getUserPosts = async (req, res) => {

  const {username} = req.params;

  const user = await User.findUser(username)
  
  User.userPosts(user[0].user_id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        error: err,
      });
    });
}; 


exports.getPublicProfile = async (req,res) => {

  const {username} = req.params;

  
  const user = await User.getPublicProfile(username)
  
  const status = await Personal.getPersonals(user[0].user_id)

  await Blog.getBlogsFromUser(user[0].user_id).then((data => {
    res.json({
      user: user,
      status: status,
      blogs: data
    });
  }))

}

exports.getUserBlogs = async (req, res) => {
  const { username } = req.params;

  const user = await User.findUser(username);

  User.userBlogs(user[0].user_id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        error: err,
      });
    });
};


exports.getUserPersonals = async (req,res) => {
  
  const {username} = req.params


  const user = await User.findUser(username)

  Personal
    .getPersonals(user[0].user_id)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json({
        error :err
      })
    })
}

exports.uploadImage = (req,res) => {

  const { img_path } = req.body;

  if (!img_path) {
    res.json({
      err: "img path missing",
    });
  }

  knex("users")
    .where("users.user_id", req.user.id)
    .update({
      img_path: img_path,
    })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
    });
}


exports.getFollowRelationships = async (req,res) => {

  const id = req.user.id;

  const followers = await Following
  .getUserFollowers(id)
  .then(data => {return data})
  .catch(err => res.json({err : err}) )

  const following = await Following
  .getUserFollowing(id)
  .then(data => {return data})
  .catch(err => res.json({err : err}) )


  res.json({
    followers,
    following
  })

}