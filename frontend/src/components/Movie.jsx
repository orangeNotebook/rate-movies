import "../App.css";
import React, { useState } from "react";

import axios from "axios";
import { Stack, Chip, Rating, Typography, Box, Button } from "@mui/material";
import CreateRating from "./CreateRating";

function Movie(props) {
  const [ratings, setRatings] = useState([]);
  const [categories, setCateogires] = useState([]);
  const [gotData, setGotData] = useState(false);
  const [addRatingClicked, setAddRatingClicked] = useState(false);

  function handleClick() {
    setAddRatingClicked(true);
  }

  function calculateTotalRating() {
    let total = 0;
    for (let i in ratings) {
      total += ratings[i].rating;
      console.log(total);
    }
    return total / ratings.length;
  }

  function getData() {
    async function apifunc() {
      const data = {
        movieId: props.movie.id,
      };
      try {
        const postCateogires = await axios.post(
          "http://localhost:5000/getMovieCategories",
          data
        );
        const postRatings = await axios.post(
          "http://localhost:5000/getMovieRatings",
          data
        );
        setCateogires(postCateogires.data);
        setRatings(postRatings.data);
        setGotData(true);
      } catch (err) {
        console.log(err);
      }
    }

    apifunc();
  }

  if (gotData) {
    return (
      <div className="movie-container">
        <Typography variant="h4" sx={{ paddingBottom: "10px" }}>
          {props.movie.title}
        </Typography>
        {addRatingClicked ? (
          <Button
            sx={{ marginBottom: "20px" }}
            variant="contained"
            color="error"
            onClick={() => {
              setAddRatingClicked(false);
            }}
          >
            Cancel
          </Button>
        ) : (
          <Button
            sx={{ marginBottom: "20px" }}
            onClick={handleClick}
            variant="contained"
            color="success"
          >
            Add a rating
          </Button>
        )}

        <Stack direction="row" spacing={1} sx={{ paddingBottom: "10px" }}>
          {categories.map((category) => {
            return <Chip color="primary" label={category.category} />;
          })}
        </Stack>
        {addRatingClicked ? (
          <CreateRating
            title={props.movie.title}
            movieId={props.movie.id}
            currentUser={props.currentUser}
          />
        ) : (
          <>
            <Typography component="legend">Average</Typography>
            <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
                paddingBottom: "10px",
              }}
            >
              <Rating
                precision={0.1}
                name="read-only"
                max={10}
                value={calculateTotalRating()}
                readOnly
              />
              <Box sx={{ ml: 2 }}>{calculateTotalRating()}</Box>
            </Box>

            {ratings.map((rating) => {
              return (
                <>
                  <Typography component="legend">{rating.userName}</Typography>

                  <Box
                    sx={{
                      width: 200,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Rating
                      precision={0.1}
                      name="read-only"
                      max={10}
                      value={rating.rating}
                      readOnly
                    />

                    <Box sx={{ ml: 2 }}>{rating.rating}</Box>
                  </Box>
                </>
              );
            })}
          </>
        )}
      </div>
    );
  } else {
    getData();
  }
}

export default Movie;
