const express = require("express");
const mysql_connector = require("mysql");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const connection = mysql_connector.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "rate-movies",
});

connection.connect();

//default path
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.get("/test", (req, res) => {
  res.send("Testing");
});

app.get("/getAllMovies", (req, res) => {
  connection.query(
    "SELECT * FROM `rate-movies`.media;",
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
    "SELECT `media-rating`.`id`, `movie-id`, `title`, `user-id`, `userName`, `rating` FROM `media-rating` inner join `media` on `media`.`id` = `media-rating`.`movie-id` inner join `users` on `users`.`id` = `media-rating`.`user-id` where `movie-id` = " +
      movieId,
    function (error, results) {
      res.send(results);
    }
  );
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
