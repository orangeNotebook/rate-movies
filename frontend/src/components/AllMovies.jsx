import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "./Movie";
import {
  Stack,
  Chip,
  Rating,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/AddBox";
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
            <Stack
              direction="row"
              spacing={0}
              justifyContent="center"
              sx={{ paddingBottom: "15px" }}
            >
              {" "}
              <Typography
                component="h2"
                variant="h4"
                sx={{ textAlign: "center" }}
              >
                All {props.selectedType}s
              </Typography>
              <IconButton
                variant="contained"
                color="success"
                onClick={handleClick}
              >
                <AddIcon fontSize="inherit" />
              </IconButton>
            </Stack>
            {res.map((movie) => {
              return (
                <>
                  <Movie movie={movie} selectedType={props.selectedType} />
                </>
              );
            })}
          </>
        )}
      </div>
    );
  } else {
    getData();
  }
}

export default AllMovies;
