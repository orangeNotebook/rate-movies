import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "./Movie";
import { Stack, Chip, Rating, Typography, Box, Button } from "@mui/material";
import CreateMovie from "./CreateMovie";

function AllMovies(props) {
  const [res, setRes] = useState([]);
  const [newMovieClicked, setNewMovieClicked] = useState(false);
  const [gotData, setGotData] = useState(false);

  useEffect(() => {
    getData();
  }, [props.selectedType]);

  function getData() {
    async function apifunc() {
      const data = {
        type: props.selectedType,
      };
      try {
        const postType = await axios.post("/getMedia", data);
        setRes(postType.data);

        setGotData(true);
      } catch (err) {
        console.log(err);
      }
    }

    apifunc();
  }

  function handleClick() {
    setNewMovieClicked(true);
  }

  if (gotData) {
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
            <CreateMovie selectedType={props.selectedType} />
          </>
        ) : (
          <>
            {" "}
            <Typography variant="h2">All {props.selectedType}s</Typography>
            {res.map((movie) => {
              return (
                <>
                  <Movie movie={movie} selectedType={props.selectedType} />
                  <br></br>
                </>
              );
            })}
            <Button variant="contained" color="success" onClick={handleClick}>
              Add new {props.selectedType}
            </Button>
          </>
        )}
      </div>
    );
  } else {
    getData();
  }
}

export default AllMovies;
