import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "./Movie";
import { Stack, Typography, IconButton, Grid, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/AddBox";
import CreateMovie from "./CreateMovie";
import BackIcon from "@mui/icons-material/Backspace";
import Search from "./Search";
import Filters from "./Filters";

function AllMovies(props) {
  const [res, setRes] = useState([]);
  const [displayedMedia, setDisplayedMedia] = useState([]);
  const [newMovieClicked, setNewMovieClicked] = useState(false);
  const [gotData, setGotData] = useState(false);
  const [quickRefresh, setQuickRefresh] = useState(false);
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
        setDisplayedMedia(postType.data);
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
                Add a {props.selectedType}
              </Typography>
              <IconButton
                variant="contained"
                color="error"
                onClick={() => {
                  setNewMovieClicked(false);
                }}
              >
                <BackIcon fontSize="inherit" />
              </IconButton>
            </Stack>

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
            <Paper sx={{ paddingTop: "10px", margin: "10px" }}>
              <Search media={res} setMedia={setDisplayedMedia} />
              <Filters
                media={res}
                setDisplayedMedia={setDisplayedMedia}
                setMedia={setRes}
                setQuickRefresh={setQuickRefresh}
                selectedType={props.selectedType}
              />
            </Paper>
            {quickRefresh ? (
              setQuickRefresh(false)
            ) : (
              <Grid container spacing={0}>
                {displayedMedia.map((movie) => {
                  return (
                    <>
                      <Grid item md={15} xs={15} lg={6} xl={4}>
                        <Movie
                          movie={movie}
                          selectedType={props.selectedType}
                        />
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            )}
          </>
        )}
      </div>
    );
  } else {
    getData();
  }
}

export default AllMovies;
