const router = require("express").Router();
const fs = require("fs");

readNewsFeed = () => {
  const newsData = fs.readFileSync("./staticData/news.json");
  const parsedData = JSON.parse(newsData);

  return parsedData;
};

router.get("/", (req, res) => {
  const news = readNewsFeed();
  res.json(news);
});

module.exports = router;