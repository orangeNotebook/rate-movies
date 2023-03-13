import "../App.css";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

import { Stack, Typography, TextField, Button } from "@mui/material";

import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(category, selectedCategories, theme) {
  return {
    fontWeight:
      selectedCategories.indexOf(category) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function CreateMovie(props) {
  const theme = useTheme();
  const [title, setTitle] = useState(props.title || "");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [gotCategories, setGotCategories] = useState(false);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  function getAllCategories() {
    axios.get("http://localhost:5000/getAllCategories").then((response) => {
      console.log(response.data);
      setCategories(response.data);
      setGotCategories(true);
    });
  }

  function putMovie() {
    async function apifunc() {
      const data = {
        inputTerms: { title: title, categories: selectedCategories },
      };
      try {
        const putTitle = await axios.put(
          "http://localhost:5000/putMovie",
          data
        );
        console.log(putTitle);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }

    apifunc();
  }

  if (gotCategories) {
    return (
      <div className="movie-container">
        <Typography variant="h4" sx={{ paddingBottom: "10px" }}>
          Create a new movie
        </Typography>
        <Stack direction="row" spacing={1} sx={{ paddingBottom: "10px" }}>
          <TextField
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            value={title}
            id="movie-title"
            color="primary"
            label="Movie Title"
            variant="outlined"
          />

          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={selectedCategories}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={categories}
          >
            {categories.map((category) => (
              <MenuItem
                key={category.category}
                value={category.id}
                style={getStyles(category.category, selectedCategories, theme)}
              >
                {category.category}
              </MenuItem>
            ))}
          </Select>

          <Button variant="contained" color="success" onClick={putMovie}>
            Submit
          </Button>
        </Stack>
      </div>
    );
  } else {
    getAllCategories();
  }
}

export default CreateMovie;
