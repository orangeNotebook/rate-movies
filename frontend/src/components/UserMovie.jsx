import "../App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Stack,
  Chip,
  Rating,
  Typography,
  Box,
  Paper,
  IconButton,
  Icon,
  Tooltip,
  Button,
} from "@mui/material";
import CreateRating from "./CreateRating";
import AddIcon from "@mui/icons-material/AddBox";
import BackIcon from "@mui/icons-material/Backspace";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PersonIcon from "@mui/icons-material/Person";
import { minHeight } from "@mui/system";

function UserMovie(props) {
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

  function handleDelete(review) {
    async function apifunc() {
      const data = {
        ratingId: review.id,
      };
      try {
        await axios.post("/deleteRating", data);
        setGotData(false);
      } catch (err) {
        console.log(err);
      }
    }

    if (
      window.confirm(
        "Are you sure you want to delete " +
          review.userName +
          "s review of " +
          props.movie.title +
          "?"
      )
    ) {
      apifunc();
    }
  }

  if (gotData) {
    return (
      <Paper
        className="movie-container"
        sx={{ height: { xs: "fit-content", sm: "520px" } }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          sx={{ paddingBottom: "10px" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Tooltip
              title={
                props.movie.userName[props.movie.userName.length - 1] === "s"
                  ? props.movie.userName + "' score"
                  : props.movie.userName + "'s score"
              }
            >
              <Icon>
                <PersonIcon />
              </Icon>
            </Tooltip>

            <Box sx={{ ml: 2 }}>{props.movie.rating}</Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Tooltip title="Global score">
              <Icon>
                <Rating
                  precision={0.1}
                  name="read-only"
                  max={1}
                  value={calculateTotalRating()}
                  readOnly
                />
              </Icon>
            </Tooltip>
            <Box sx={{ ml: 2 }}>{calculateTotalRating()}</Box>
          </Box>
        </Stack>
        <Typography variant="h4">{props.movie.title}</Typography>

        <Typography
          variant="h6"
          component="p"
          sx={{ paddingBottom: "10px", minHeight: "105px" }}
        >
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
              setAddRatingClicked={setAddRatingClicked}
              setGotData={setGotData}
              title={props.movie.title}
              movieId={props.movie.id}
              currentUser={props.currentUser}
            />
          </>
        ) : (
          <>
            <Stack
              direction="column"
              spacing={0}
              sx={{
                overflow: "scroll",
                overflowX: "hidden",
                overflowY: "auto",
                maxHeight: { xs: "1000px", sm: "190px", xl: "175px" },
              }}
            >
              {ratings.map((rating) => {
                return (
                  <>
                    <Stack direction="row" spacing={1}>
                      <Button
                        sx={{
                          paddingBottom: "0px",
                          paddingTop: "0px",
                          paddingLeft: "2px",
                          paddingRight: "2px",
                          textTransform: "none",
                          fontSize: "1.4rem",
                        }}
                        variant="text"
                        onClick={(e) => {
                          props.setSelectedUser(rating.userName);
                          props.setGotData(false);
                        }}
                      >
                        {rating.userName}
                      </Button>
                      <IconButton
                        variant="contained"
                        color="error"
                        onClick={() => {
                          handleDelete(rating);
                        }}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </Stack>

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
            </Stack>
          </>
        )}
      </Paper>
    );
  } else {
    getData();
  }
}

export default UserMovie;
