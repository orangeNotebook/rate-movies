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
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import CreateRating from "./CreateRating";
import AddIcon from "@mui/icons-material/AddBox";
import BackIcon from "@mui/icons-material/Backspace";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function MovieDetails(props) {
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
      <Grid container>
        <Grid item lg={0} xl={2}>
          <IconButton
            sx={{ float: "right" }}
            variant="contained"
            color="error"
            onClick={() => {
              props.setSelectedMovie("");
            }}
          >
            <BackIcon />
          </IconButton>
        </Grid>
        <Grid item lg={15} xl={8}>
          <Card
            sx={{
              margin: "10px",
            }}
          >
            <Stack direction={{ xs: "column", md: "row" }}>
              <CardMedia
                onClick={() => {
                  props.setSelectedMovie(props.movie);
                }}
                component="img"
                width={{ md: 250, xs: "auto" }}
                sx={{ maxWidth: { md: 250, lg: 250, xl: 250, xs: "auto" } }}
                image={
                  props.movie.image ||
                  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F5%2F50%2FBlack_colour.jpg&f=1&nofb=1&ipt=6c0c71f7e088e4661c44556c789a4acbf713d04dca34c28100bf2f4669b2317f&ipo=images"
                }
                alt={props.movie.title + " image"}
              />

              <CardContent sx={{ padding: "5px" }}>
                <>
                  <Typography variant="h4" component="div">
                    {props.movie.title}
                  </Typography>
                </>

                <>
                  <Box
                    sx={{
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
                    <Stack direction="row">
                      <Box sx={{ ml: 0.5 }}>{calculateTotalRating()}</Box>
                      <Box sx={{ ml: 0.3, color: "gray" }}>/10</Box>
                    </Stack>
                  </Box>
                </>

                <>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1}
                    sx={{ paddingBottom: "10px" }}
                  >
                    {categories.map((category) => {
                      return <Chip color="primary" label={category.category} />;
                    })}
                  </Stack>
                </>

                <>
                  <Typography variant="h5" component="div">
                    {props.movie.description}
                  </Typography>
                </>
              </CardContent>
            </Stack>
          </Card>
          <Paper
            sx={{
              margin: "10px",
              padding: "10px",
            }}
          >
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
                <Stack direction="column" spacing={0}>
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
        </Grid>
        <Grid item lg={0} xl={2}></Grid>
      </Grid>
    );
  } else {
    getData();
  }
}

export default MovieDetails;
