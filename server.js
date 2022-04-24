require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();

let SERVER_PORT = process.env.PORT;


app.listen(SERVER_PORT, () => {
  console.log(`listening at ${SERVER_PORT}`);
});