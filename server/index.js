const express = require("express");
const mysql_connector = require("mysql");
const cors = require("cors");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.static(__dirname + "/public"));
app.use(express.json());
require("dotenv").config();

const connection = mysql_connector.createConnection({
  host: process.env.HOSTNAME,
  user: process.env.DBUSERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect();

//default path

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

app.post("/getMedia", (req, res) => {
  let { type } = req.body;

  connection.query(
    "SELECT `media`.`id`, `title`, `type` FROM `media` join `media-type` on `media-type`.`movie-id` = `media`.`id` join `type` on `type`.`id` = `type-id` where `type` = " +
      `"${type}"`,
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
        " ((SELECT MAX(ID) FROM media), (SELECT id FROM category where category = ?))";
      if (i === inputTerms.categories.length - 1) {
        insertStatement += ";";
      } else {
        insertStatement += ",";
      }
    }

    return { insertStatement: insertStatement, values: values };
  }

  function generateQueryType() {
    let values = [[`${inputTerms.type}`]];
    let insertStatement =
      "INSERT INTO `media-type`(`movie-id`,`type-id`) VALUES ((SELECT MAX(ID) FROM media), (SELECT `type`.`id` FROM `type` WHERE `type`.`type` = ?))";

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
          connection.query(
            generateQueryType().insertStatement,
            generateQueryType().values,
            function (err2, result2) {
              if (err2) throw err2;
              res.send(result2);
            }
          );
        }
      );
    }
  );
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/", "index.html"));
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
