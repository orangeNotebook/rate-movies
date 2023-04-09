import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "./Movie";
import { Stack, Typography, IconButton, Grid, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/AddBox";
import CreateMovie from "./CreateMovie";
import BackIcon from "@mui/icons-material/Backspace";
import Search from "./Search";
import Filters from "./Filters";
import UserMovie from "./UserMovie";
import UserRatingDistribution from "./UserRatingDistribution";

function UserProfile(props) {
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
        userName: props.selectedUser,
      };
      try {
        const postType = await axios.post("/getUsersMedia", data);
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
        <Stack
          direction="row"
          spacing={0}
          justifyContent="center"
          sx={{ paddingBottom: "15px" }}
        >
          <IconButton
            variant="contained"
            color="error"
            onClick={(e) => {
              props.setSelectedUser("");
            }}
          >
            <BackIcon fontSize="inherit" />
          </IconButton>
          <Typography component="h2" variant="h4" sx={{ textAlign: "center" }}>
            {props.selectedUser[props.selectedUser.length - 1] === "s" ? (
              <>
                {props.selectedUser}' {props.selectedType} Ratings
              </>
            ) : (
              <>
                {props.selectedUser}'s {props.selectedType} Ratings
              </>
            )}
          </Typography>
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

        <UserRatingDistribution
          media={res}
          selectedUser={props.selectedUser}
          selectedType={props.selectedType}
        />

        {quickRefresh ? (
          setQuickRefresh(false)
        ) : (
          <Grid container spacing={0}>
            {displayedMedia.map((movie) => {
              return (
                <>
                  <Grid item md={15} xs={15} lg={6} xl={4}>
                    <UserMovie
                      movie={movie}
                      selectedType={props.selectedType}
                      setSelectedUser={props.setSelectedUser}
                      setGotData={setGotData}
                    />
                  </Grid>
                </>
              );
            })}
          </Grid>
        )}
      </div>
    );
  } else {
    getData();
  }
}

export default UserProfile;
