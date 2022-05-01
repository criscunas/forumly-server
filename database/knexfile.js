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
    },
    pool : {
      afterCreate : function(conn,done) {
        conn.query('SELECT * FROM users',function (err) {
        if (err) {
          console.log(err)
          done(err, conn);
        } else {
          // do the second query...
          console.log('connected')
          done(err,conn)
            // if err is not falsy, connection is discarded from pool
            // if connection aquire was triggered by a query the error is passed to query promise
          
          }
        })
      }
    }
  },
};

// const knex = require('knex')(configs);

// module.exports = knex;



