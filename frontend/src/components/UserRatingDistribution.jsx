import { Box, Paper, Typography } from "@mui/material";
import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function UserRatingDistribution(props) {
  let date = new Date(Date.now());

  function getGraphData() {
    let data = [];
    let roundedArray = [];
    let countsObj = {};

    for (let b in props.media) {
      roundedArray.push(Math.round(props.media[b].rating));
    }
    for (const num of roundedArray) {
      countsObj[num] = countsObj[num] ? countsObj[num] + 1 : 1;
    }
    for (let i = 0; i < 10; i++) {
      data.push({ name: `${i + 1}`, Ratings: countsObj[i + 1] || 0 });
    }

    return data;
  }

  return (
    <Paper
      sx={{
        padding: "10px",
        margin: "10px",
        height: { xs: "100%", sm: "100%" },
      }}
    >
      <Typography
        component="h3"
        variant="h5"
        sx={{ textAlign: "center", margin: "10px" }}
      >
        {props.selectedUser[props.selectedUser.length - 1] === "s" ? (
          <>
            {props.selectedUser}' {props.selectedType} Rating Distribution
          </>
        ) : (
          <>
            {props.selectedUser}'s {props.selectedType} Rating Distributuon
          </>
        )}
      </Typography>
      <Box
        sx={{
          height: { xs: "300px", sm: "300px" },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={getGraphData()}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Ratings"
              stroke="#00ffe4"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
