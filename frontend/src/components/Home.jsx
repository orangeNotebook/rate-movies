import React from "react";
import { Stack, Button } from "@mui/material";

function Home(props) {
  return (
    <div>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        sx={{ paddingBottom: "15px" }}
      >
        <Button
          variant="contained"
          color={props.selected === "Movie" ? "primary" : "success"}
          onClick={() => {
            props.setSelected("Movie");
          }}
        >
          Movies
        </Button>
        <Button
          variant="contained"
          color={props.selected === "Show" ? "primary" : "success"}
          onClick={() => {
            props.setSelected("Show");
          }}
        >
          Shows
        </Button>
        <Button
          variant="contained"
          color={props.selected === "Game" ? "primary" : "success"}
          onClick={() => {
            props.setSelected("Game");
          }}
        >
          Games
        </Button>
        <Button
          variant="contained"
          color={props.selected === "Album" ? "primary" : "success"}
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
