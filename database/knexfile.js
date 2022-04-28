require("dotenv").config();

let DB = process.env.DBNAME;
let USER = process.env.USER;
let PSW = process.env.PSW;
let HOST = process.env.HOST;


module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: HOST,
      user: 'admin',
      password: 'Kayla1996!',
      database: DB,
      charset: "utf8",
    },
  },
};

