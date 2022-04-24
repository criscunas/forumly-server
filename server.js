require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
let SERVER_PORT = process.env.PORT;

app.use(cors());
app.use(express.json());


const userRoute = require("./routes/user");
const threadRoute = require('./routes/thread')
const postRoute = require("./routes/post");
const personalRoute = require("./routes/personal");
const blogRoute = require("./routes/blog");
const followRoute = require("./routes/follow");
const newsRoute = require("./routes/news");
const categoryRoute = require("./routes/categories");

app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/thread", threadRoute);
app.use("/personal", personalRoute);
app.use("/blog", blogRoute);
app.use('/follow', followRoute)
app.use("/newsfeed", newsRoute);
app.use("/categories", categoryRoute);



app.listen(SERVER_PORT, () => {
  console.log(`listening at ${SERVER_PORT}`);
});