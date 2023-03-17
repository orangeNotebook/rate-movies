import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  Paper,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";
import "../App.css";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

function Filters(props) {
  function getHighestRated() {
    let sortedArr = props.media.sort(function (a, b) {
      return b.AR - a.AR;
    });

    props.setDisplayedMedia(sortedArr);
    props.setMedia(sortedArr);
    props.setQuickRefresh(true);
  }

  function getLowestRated() {
    let sortedArr = props.media.sort(function (a, b) {
      return a.AR - b.AR;
    });

    props.setDisplayedMedia(sortedArr);
    props.setMedia(sortedArr);
    props.setQuickRefresh(true);
  }

  return (
    <div className="header-container">
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button onClick={getHighestRated}>
          <Stack direction={"row"} spacing={1}>
            <StarIcon></StarIcon>
            <Typography variant="p">High to Low</Typography>
          </Stack>
        </Button>
        <Button onClick={getLowestRated}>
          <Stack direction={"row"} spacing={1}>
            <StarBorderIcon></StarBorderIcon>
            <Typography variant="p">Low to High</Typography>
          </Stack>
        </Button>
      </Stack>
    </div>
  );
}

export default Filters;
