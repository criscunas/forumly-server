const configs = require("./database/knexfile").development;
const knex = require("knex");
const connection = knex(configs);


// // try {
// //   var mysql_npm = require("../node_modules/mysql");
// // } catch (err) {
// //   console.log(
// //     "Cannot find `mysql` module. Is it installed ? Try `npm install mysql` or `npm install`."
// //   );
// // }

// // var db_config = {
// //     host: "aws-digi.cqrtseevafuu.us-east-1.rds.amazonaws.com",
// //     port: 3306,
// //     user: "admin",
// //     password: "Kayla1996!",
// //     database: "digi",
// //     charset: "utf8",
// // };

// // var dbconnection = mysql_npm.createPool(db_config);



// // dbconnection.getConnection(function (err) {
// //   if (err) {
// //     // mysqlErrorHandling(connection, err);
// //     console.log(
// //       "\n\t *** Cannot establish a connection with the database. ***"
// //     );

// //     dbconnection = reconnect(dbconnection);
// //   } else {
// //     console.log("\n\t *** New connection established with the database. ***");
// //   }
// // });


// // function reconnect(dbconnection) {
// //   console.log("\n New connection tentative...");

// //   //- Create a new one
// //   dbconnection = mysql_npm.createPool(db_config);

// //   //- Try to reconnect
// //   dbconnection.getConnection(function (err) {
// //     if (err) {
// //       //- Try to connect every 2 seconds.
// //       setTimeout(reconnect(dbconnection), 2000);
// //     } else {
// //       console.log("\n\t *** New connection established with the database. ***");
// //       return dbconnection;
// //     }
// //   });
// // }

module.exports = connection;
