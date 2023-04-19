import React, { useState, useEffect } from "react";
import axios from "axios";
import { Stack, Typography, IconButton, Grid, Paper } from "@mui/material";
import BackIcon from "@mui/icons-material/Backspace";
import Search from "./Search";
import Filters from "./Filters";
import UserMovie from "./UserMovie";
import UserRatingDistribution from "./UserRatingDistribution";

function UserProfile(props) {
  const [res, setRes] = useState([]);
  const [displayedMedia, setDisplayedMedia] = useState([]);
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
        <Typography
          sx={{
            paddingLeft: "10px",
            paddingBottom: "10px",
          }}
        >
          Showing {displayedMedia.length} {props.selectedType}s
        </Typography>

        {quickRefresh ? (
          setQuickRefresh(false)
        ) : (
          <Grid container spacing={0}>
            {displayedMedia.map((movie) => {
              return (
                <>
                  <Grid item md={3} xs={6} lg={3} xl={2}>
                    <UserMovie
                      movie={movie}
                      selectedType={props.selectedType}
                      setSelectedUser={props.setSelectedUser}
                      setGotData={setGotData}
                      setSelectedMovie={props.setSelectedMovie}
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
