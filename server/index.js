const express = require("express");
const mysql_connector = require("mysql");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 8080;

app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(express.json());
require("dotenv").config();

const connection = mysql_connector.createConnection({
  host: process.env.HOSTNAME,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect();

//default path
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/", "index.html"));
});

app.get("/getAllMovies", (req, res) => {
  connection.query(
    "SELECT * FROM `rate-movies`.media;",
    function (error, results) {
      res.send(results);
    }
  );
});

app.get("/getAllCategories", (req, res) => {
  connection.query(
    "SELECT * FROM `rate-movies`.category;",
    function (error, results) {
      res.send(results);
    }
  );
});

app.post("/getMovieCategories", (req, res) => {
  let { movieId } = req.body;

  connection.query(
    "SELECT `media-category`.`id`, `media-category`.`movie-id`, `category` FROM `media-category` inner join `category` on `media-category`.`category-id` = `category`.`id` where `media-category`.`movie-id` = " +
      movieId,
    function (error, results) {
      res.send(results);
    }
  );
});

app.post("/getMovieRatings", (req, res) => {
  let { movieId } = req.body;
  connection.query(
    "SELECT `media-rating-simple`.`id`, `movie-id`, `title`, `userName`, `rating` FROM `media-rating-simple` inner join `media` on `media`.`id` = `media-rating-simple`.`movie-id` where `movie-id` =" +
      movieId,
    function (error, results) {
      res.send(results);
    }
  );
});

app.put("/putRating", (req, res) => {
  let { userInputs } = req.body;

  const insertStatement =
    "INSERT INTO `rate-movies`.`media-rating-simple` (`movie-id`,`userName`,`rating`) VALUES (?,?,?);";

  const values = [
    [userInputs.movieId],
    [userInputs.userName],
    [userInputs.rating],
  ];
  connection.query(insertStatement, values, function (error, results) {
    if (error) throw error;
    res.send(results);
  });
});

app.put("/putMovie", (req, res) => {
  let { inputTerms } = req.body;

  function generateQueryMedia() {
    let values = [[`${inputTerms.title}`]];
    let insertStatement = "INSERT INTO `media` (`title`) VALUES (?); ";

    return { insertStatement: insertStatement, values: values };
  }

  function generateQueryCategories() {
    let values = [];
    let insertStatement =
      "INSERT INTO `media-category`(`movie-id`,`category-id`) VALUES";

    for (let i = 0; i < inputTerms.categories.length; i++) {
      values.push([inputTerms.categories[i]]);
      insertStatement +=
        " ((SELECT LAST_INSERT_ID() media), (SELECT id FROM category where category = ?))";
      if (i === inputTerms.categories.length - 1) {
        insertStatement += ";";
      } else {
        insertStatement += ",";
      }
    }

    return { insertStatement: insertStatement, values: values };
  }

  connection.query(
    generateQueryMedia().insertStatement,
    generateQueryMedia().values,
    function (error, results) {
      if (error) throw error;
      connection.query(
        generateQueryCategories().insertStatement,
        generateQueryCategories().values,
        function (err, result) {
          if (err) throw err;
          res.send(result);
        }
      );
    }
  );
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
