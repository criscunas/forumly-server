require("dotenv").config();

let DB = process.env.DBNAME;
let USER = process.env.USER;
let PSW = process.env.PSW;
let HOST = process.env.HOST;




module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "aws-digi.cqrtseevafuu.us-east-1.rds.amazonaws.com",
      port: 3306,
      user: "admin",
      password: "Kayla1996!",
      database: "digi",
      charset: "utf8",
    }
  },
};

// const knex = require('knex')(configs);

// module.exports = knex;



