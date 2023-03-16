import { Paper, Typography } from "@mui/material";
import React from "react";

function Footer() {
  let today = new Date();
  return (
    <div>
      <Paper sx={{ textAlign: "center", padding: "10px", marginTop: "10px" }}>
        <Typography variant="h5" component="p">
          MK © {today.getFullYear()}
        </Typography>
      </Paper>
    </div>
  );
}

export default Footer;
