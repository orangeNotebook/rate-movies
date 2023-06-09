import "../App.css";
import React, { useState } from "react";
import axios from "axios";
import { Stack, Typography, TextField, Button } from "@mui/material";

function CreateRating(props) {
  const [rating, setRating] = useState(0);
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");

  function putReview() {
    async function apifunc() {
      const data = {
        userInputs: {
          movieId: props.movieId,
          userName: userName,
          rating: rating,
          comment: description,
        },
      };
      try {
        const putRating = await axios.put("/putRating", data);
        console.log(putRating);
        props.setGotData(false);
        props.setAddRatingClicked(false);
      } catch (err) {
        console.log(err);
      }
    }

    apifunc();
  }

  return (
    <div>
      <Typography variant="h4" sx={{ paddingBottom: "10px" }}>
        Give a rating
      </Typography>

      <Stack
        direction={{ md: "column", lg: "row" }}
        spacing={1}
        sx={{ paddingBottom: "10px" }}
      >
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
          sx={{ width: { lg: "120px", md: "100%" } }}
          id="rating"
          color="primary"
          label="Rating (1-10)"
          variant="outlined"
        />

        <Stack direction="row" spacing={1} sx={{ paddingBottom: "10px" }}>
          <TextField
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            value={description}
            multiline
            minRows={1}
            sx={{ width: { lg: "530px", md: "100%" } }}
            id="description"
            color="primary"
            label="Description"
            variant="outlined"
          />
          <Typography variant="h5" component="p" sx={{ fontSize: "15px" }}>
            {description.length} / 280
          </Typography>
        </Stack>
        <Button
          sx={{ height: "50px" }}
          variant="contained"
          color="success"
          disabled={rating === "" || userName === "" || Number(rating) >= 10.1}
          onClick={putReview}
        >
          Submit
        </Button>
      </Stack>
    </div>
  );
}

export default CreateRating;
