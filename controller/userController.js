require("dotenv").config();
const knex = require("../db");
const bcrypt = require("bcrypt");
const User = require("../helpers/users");
const Following = require("../helpers/followings");



const jwt = require("jsonwebtoken");

const JWT_S = process.env.JWTS

exports.addUser = (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.hashed_password) {
    return res.status(400).send("Missing Information");
  }

  const hash = bcrypt.hashSync(req.body.hashed_password, 10);

  const newUser = {
    username: req.body.username,
    email: req.body.email,
    hashed_password: hash,
  };

  knex
    .from("users")
    .where("username", req.body.username)
    .orWhere("email", req.body.email)
    .then((data) => {
      if (data.length !== 0) {
        return res.status(400).send("errorMessage : invalid");
      } else {
        knex("users")
          .insert(newUser)
          .then((user) => {
            const token = jwt.sign(
              { username: user.username, email: user.email, id: user.user_id },
                JWT_S,
              { expiresIn: "24h" }
              );
              res.json({ token });
            })
          .catch((error) => {
            res.send(error);
          });
      }
    });
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
        { username: user.username, email: user.email, id: user.user_id },
        JWT_S,
        { expiresIn: "24h" }
        );
      
      res.json({ token });
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

  const userStatus = await User.getUserStatus(userMain[0].user_id).then(
    (status) => {
      return status;
    }
  );

  const userBlogs = await User.userBlogs(userMain[0].user_id).then((blogs) => {
    return blogs;
  });

  const userFollowing = await Following.getUserFollowing(userMain[0].user_id)

  const userFollowers = await Following.getUserFollowers(userMain[0].user_id)

  res.json({
    user: {
      user_id: userMain[0].user_id,
      username: userMain[0].username,
      bio: userMain[0].bio,
      img_path: userMain[0].img_path,
      created: userMain[0].created
    },
    personals: userStatus,
    blogs: userBlogs,
    following : userFollowing,
    followers : userFollowers
  });
};

exports.userBio = (req, res) => {
  const {bio} = req.body;

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

exports.getUserThreads = (req,res) => {

  let obj = {
    user_account_id : req.user.id
  }

  User
    .userThreads(obj)
    .then((data) => {
      res.json(data)
    })
    .catch(err => {
      res.json({
        error: err
      })
    })
} 


exports.getUserPosts = (req, res) => {

  let obj = {
    user_account_id: req.user.id,
  };

  User.userPosts(obj)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({
        error: err,
      });
    });
}; 