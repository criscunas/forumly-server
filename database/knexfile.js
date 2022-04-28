require("dotenv").config();

let DB = process.env.DBNAME;
let USER = process.env.USER;
let PSW = process.env.PSW;
let HOST = process.env.HOST;

try {
  var mysql_npm = require("../node_modules/mysql");
} catch (err) {
  console.log(
    "Cannot find `mysql` module. Is it installed ? Try `npm install mysql` or `npm install`."
  );
}


module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "aws-digi.cqrtseevafuu.us-east-1.rds.amazonaws.com",
      port: 3306,
      user: 'admin',
      password: 'Kayla1996!',
      database: "digi",
      charset: "utf8",
    },
  },
};

var db_config = {
    host: "aws-digi.cqrtseevafuu.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "Kayla1996!",
    database: "digi",
    charset: "utf8",
};

var connection = mysql_npm.createPool(db_config);

connection.getConnection(function (err) {
  if (err) {
    // mysqlErrorHandling(connection, err);
    console.log(
      "\n\t *** Cannot establish a connection with the database. ***"
    );

    connection = reconnect(connection);
  } else {
    console.log("\n\t *** New connection established with the database. ***");
  }
});

function reconnect(connection) {
  console.log("\n New connection tentative...");

  //- Create a new one
  connection = mysql_npm.createPool(db_config);

  //- Try to reconnect
  connection.getConnection(function (err) {
    if (err) {
      //- Try to connect every 2 seconds.
      setTimeout(reconnect(connection), 2000);
    } else {
      console.log("\n\t *** New connection established with the database. ***");
      return connection;
    }
  });
}

connection.on("error", function (err) {
  //-
  //- The server close the connection.
  //-
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    console.log(
      "/!\\ Cannot establish a connection with the database. /!\\ (" +
        err.code +
        ")"
    );
    return reconnect(connection);
  } else if (err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT") {
    console.log(
      "/!\\ Cannot establish a connection with the database. /!\\ (" +
        err.code +
        ")"
    );
    return reconnect(connection);
  } else if (err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
    console.log(
      "/!\\ Cannot establish a connection with the database. /!\\ (" +
        err.code +
        ")"
    );
    return reconnect(connection);
  } else if (err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE") {
    console.log(
      "/!\\ Cannot establish a connection with the database. /!\\ (" +
        err.code +
        ")"
    );
  } else {
    console.log(
      "/!\\ Cannot establish a connection with the database. /!\\ (" +
        err.code +
        ")"
    );
    return reconnect(connection);
  }
});
