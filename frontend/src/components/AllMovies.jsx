import React, { useState } from "react";
import Movie from "./Movie";
import { Stack, Chip, Rating, Typography, Box, Button } from "@mui/material";
import CreateRating from "./CreateRating";
import CreateMovie from "./CreateMovie";

function AllMovies(props) {
  const [newMovieClicked, setNewMovieClicked] = useState(false);

  function handleClick() {
    setNewMovieClicked(true);
  }

  return (
    <div>
      {newMovieClicked ? (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setNewMovieClicked(false);
            }}
          >
            Cancel
          </Button>
          <CreateMovie />
        </>
      ) : (
        <>
          {" "}
          <h2>All Movies</h2>{" "}
          {props.movies.map((movie) => {
            return (
              <>
                <Movie movie={movie} />
                <br></br>
              </>
            );
          })}
          <Button variant="contained" color="success" onClick={handleClick}>
            Add new movie
          </Button>
        </>
      )}
    </div>
  );
}

export default AllMovies;
