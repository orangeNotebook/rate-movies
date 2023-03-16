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
} from "@mui/material";
import "../App.css";
import { minWidth } from "@mui/system";

function Search(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [gotCategories, setGotCategories] = useState(false);

  function getAllCategories() {
    axios.get("/getAllCategories").then((response) => {
      console.log(response.data);
      setCategories(response.data);
      setGotCategories(true);
    });
  }

  function searchPressed() {
    let searchedMedia = props.media.filter(function (name) {
      return name.title.toUpperCase().match(searchTerm.toUpperCase());
    });

    props.setMedia(searchedMedia);
  }

  function handleChange(e) {
    setSelectedCategory(e.target.value);
  }

  if (gotCategories) {
    return (
      <div className="header-container">
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ paddingBottom: "15px" }}
        >
          <TextField
            id="search"
            color="primary"
            label="Search"
            variant="outlined"
            sx={{ width: "400px" }}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          ></TextField>

          <FormControl sx={{ width: "200px" }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCategory}
              label="Age"
              onChange={handleChange}
            >
              {categories.map((category) => {
                return (
                  <MenuItem value={category.id}>{category.category}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button variant="contained" color="success" onClick={searchPressed}>
            Search
          </Button>
        </Stack>

        <Typography
          variant="p"
          sx={{ fontSize: "20px", textAlign: "center", display: "block" }}
        >
          Note: category search does not currently work
        </Typography>
      </div>
    );
  } else {
    getAllCategories();
  }
}

export default Search;
