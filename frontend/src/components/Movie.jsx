import "../App.css";
import React, { useState, useEffect } from "react";

import axios from "axios";
import {
  Stack,
  Chip,
  Rating,
  Typography,
  Box,
  Button,
  Paper,
  IconButton,
} from "@mui/material";
import CreateRating from "./CreateRating";
import AddIcon from "@mui/icons-material/AddBox";
import BackIcon from "@mui/icons-material/Backspace";

function Movie(props) {
  useEffect(() => {
    getData();
  }, [props.movie]);

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
    }
    return Math.round((total / ratings.length) * 10) / 10;
  }

  function getData() {
    async function apifunc() {
      const data = {
        movieId: props.movie.id,
      };
      try {
        const postCateogires = await axios.post("/getMovieCategories", data);
        const postRatings = await axios.post("/getMovieRatings", data);
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
      <Paper className="movie-container">
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
            max={1}
            value={calculateTotalRating()}
            readOnly
          />
          <Box sx={{ ml: 2 }}>{calculateTotalRating()}</Box>
        </Box>
        <Typography variant="h4">{props.movie.title}</Typography>

        <Typography variant="h6" component="p" sx={{ paddingBottom: "10px" }}>
          {props.movie.description}
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ paddingBottom: "10px" }}
        >
          {categories.map((category) => {
            return <Chip color="primary" label={category.category} />;
          })}
        </Stack>
        <Stack direction="row" spacing={0} sx={{ paddingBottom: "15px" }}>
          <Typography variant="h4" sx={{ paddingBottom: "10px" }}>
            User Ratings
          </Typography>

          {addRatingClicked ? (
            <IconButton
              sx={{ marginBottom: "10px" }}
              variant="contained"
              color="error"
              onClick={() => {
                setAddRatingClicked(false);
              }}
            >
              <BackIcon />
            </IconButton>
          ) : (
            <IconButton
              sx={{ marginBottom: "10px" }}
              onClick={handleClick}
              variant="contained"
              color="success"
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          )}
        </Stack>
        {addRatingClicked ? (
          <>
            {" "}
            <CreateRating
              title={props.movie.title}
              movieId={props.movie.id}
              currentUser={props.currentUser}
            />
          </>
        ) : (
          <>
            {ratings.map((rating) => {
              return (
                <>
                  <Typography variant="h6" component="legend">
                    {rating.userName}
                  </Typography>

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
      </Paper>
    );
  } else {
    getData();
  }
}

export default Movie;
