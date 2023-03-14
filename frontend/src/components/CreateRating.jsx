import "../App.css";
import React, { useState } from "react";
import axios from "axios";

import { Stack, Typography, TextField, Button } from "@mui/material";

function CreateRating(props) {
  const [title, setTitle] = useState(props.title || "");
  const [rating, setRating] = useState(0);
  const [userName, setUserName] = useState("");

  function putReview() {
    async function apifunc() {
      const data = {
        userInputs: {
          movieId: props.movieId,
          userName: userName,
          rating: rating,
        },
      };
      try {
        const putRating = await axios.put("/putRating", data);
        console.log(putRating);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }

    apifunc();
  }

  return (
    <div className="movie-container">
      <Typography variant="h4" sx={{ paddingBottom: "10px" }}>
        Give a rating
      </Typography>
      <Stack direction="row" spacing={1} sx={{ paddingBottom: "10px" }}>
        <TextField
          onChange={(event) => {
            setUserName(event.target.value);
          }}
          value={userName}
          id="username"
          color="primary"
          label="Your Name"
          variant="outlined"
        />
        <TextField
          onChange={(event) => {
            setRating(event.target.value);
          }}
          value={rating}
          id="rating"
          color="primary"
          label="Rating (1-10)"
          variant="outlined"
        />
        <Button variant="contained" color="success" onClick={putReview}>
          Submit
        </Button>
      </Stack>
    </div>
  );
}

export default CreateRating;
