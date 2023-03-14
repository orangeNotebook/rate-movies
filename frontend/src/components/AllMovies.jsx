import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "./Movie";
import { Stack, Chip, Rating, Typography, Box, Button } from "@mui/material";
import CreateMovie from "./CreateMovie";

function AllMovies() {
  const [res, setRes] = useState("");
  const [newMovieClicked, setNewMovieClicked] = useState(false);

  useEffect(() => {
    axios.get("/getAllMovies").then((response) => {
      console.log(response.data);
      setRes(response.data);
    });
  }, []);

  function handleClick() {
    setNewMovieClicked(true);
  }

  if (res) {
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
            {res.map((movie) => {
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
}

export default AllMovies;
