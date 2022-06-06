require("dotenv").config();

let DB = process.env.DBNAME;
let USER = process.env.USER;
let PSW = process.env.PSW;
let HOST = process.env.HOST;
let PORT = process.env.PORT;

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: HOST,
      port: PORT,
      user: USER,
      password: PSW,
      database: DB,
      charset: "utf8",
    }
  },
};



