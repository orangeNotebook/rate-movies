import { fontSize } from "@mui/system";
import React from "react";
import { Stack, Chip, Rating, Typography, Box, Button } from "@mui/material";

function Header() {
  return (
    <div>
      <Typography variant="h1" component="h1">
        Rate Movies
      </Typography>
      <Typography variant="h4" component="h2">
        Welcome to Rate Movies!
      </Typography>

      <Typography variant="h6" component="h3">
        This website is in Alpha and will be buggy as hell
      </Typography>
    </div>
  );
}

export default Header;
