import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "./Movie";
import { Stack, Chip, Rating, Typography, Box, Button } from "@mui/material";
import CreateMovie from "./CreateMovie";

function Home(props) {
  return (
    <div>
      <Stack direction="row" spacing={1} sx={{ paddingBottom: "10px" }}>
        <Button
          variant="contained"
          disabled={props.selected === "Movies"}
          color="success"
          onClick={() => {
            props.setSelected("Movie");
          }}
        >
          Movies
        </Button>
        <Button
          variant="contained"
          disabled={props.selected === "Shows"}
          color="success"
          onClick={() => {
            props.setSelected("Show");
          }}
        >
          Shows
        </Button>
        <Button
          variant="contained"
          disabled={props.selected === "Games"}
          color="success"
          onClick={() => {
            props.setSelected("Game");
          }}
        >
          Games
        </Button>
        <Button
          variant="contained"
          disabled={props.selected === "Albums"}
          color="success"
          onClick={() => {
            props.setSelected("Album");
          }}
        >
          Albums
        </Button>
      </Stack>
    </div>
  );
}

export default Home;
