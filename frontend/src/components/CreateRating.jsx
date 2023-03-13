import "../App.css";
import React, { useState } from "react";

import { Stack, Typography, TextField, Button } from "@mui/material";

function CreateRating(props) {
  const [title, setTitle] = useState(props.title || "");
  const [rating, setRating] = useState(0);

  return (
    <div className="movie-container">
      <Typography variant="h4" sx={{ paddingBottom: "10px" }}>
        Give a rating
      </Typography>
      <Stack direction="row" spacing={1} sx={{ paddingBottom: "10px" }}>
        <TextField
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          value={title}
          disabled={props.title}
          id="movie-title"
          color="primary"
          label="Movie Title"
          variant="outlined"
        />
        <TextField
          onChange={(event) => {
            setRating(event.target.value);
          }}
          value={rating}
          id="movie-title"
          color="primary"
          label="Rating (1-10)"
          variant="outlined"
        />
        <Button variant="contained" color="success">
          Submit
        </Button>
      </Stack>
    </div>
  );
}

export default CreateRating;
