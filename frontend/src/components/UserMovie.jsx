import "../App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Stack,
  Typography,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from "@mui/icons-material/Public";

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
      //md={3} xs={6} lg={3} xl={2}
      <Card
        sx={{
          margin: "10px",
          width: { md: "23vw", xs: "45vw", lg: "23vw", xl: "15vw" },
        }}
      >
        <CardActionArea>
          <CardMedia
            onClick={() => {
              props.setSelectedMovie(props.movie);
              props.setSelectedUser("");
            }}
            component="img"
            sx={{ aspectRatio: "3/4.6" }}
            width="250"
            image={
              props.movie.image ||
              "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F5%2F50%2FBlack_colour.jpg&f=1&nofb=1&ipt=6c0c71f7e088e4661c44556c789a4acbf713d04dca34c28100bf2f4669b2317f&ipo=images"
            }
            alt={props.movie.title + " image"}
          />
        </CardActionArea>
        <CardContent sx={{ padding: "5px" }}>
          <Stack direction={"row"} spacing={2}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <PersonIcon color="primary" />
              <Box sx={{ ml: 0.5 }}>{props.movie.rating}</Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <PublicIcon color="success" />
              <Box sx={{ ml: 0.5 }}>{calculateTotalRating()}</Box>
            </Box>
          </Stack>
          <Typography variant="h5" component="div">
            {props.movie.title}
          </Typography>
        </CardContent>
      </Card>
    );
  } else {
    getData();
  }
}

export default UserMovie;
