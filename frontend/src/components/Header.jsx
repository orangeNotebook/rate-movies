import { fontSize } from "@mui/system";
import React from "react";
import {
  Stack,
  Chip,
  Rating,
  Typography,
  Box,
  Button,
  Paper,
} from "@mui/material";
import "../App.css";

function Header() {
  return (
    <div className="header-container">
      <Paper sx={{ textAlign: "center" }}>
        <Typography variant="h4" component="h1">
          Rate Movies
        </Typography>
        <Typography variant="h6" component="h3">
          This website is in Alpha and will be buggy as hell
        </Typography>
      </Paper>
    </div>
  );
}

export default Header;
