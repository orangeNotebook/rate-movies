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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
    axios.get("/getAllCategories").then((response) => {
      console.log(response.data);
      setCategories(response.data);
      setGotCategories(true);
    });
  }

  function putMovie() {
    async function apifunc() {
      const data = {
        inputTerms: {
          title: title,
          description: description,
          categories: selectedCategories,
          type: props.selectedType,
        },
      };
      try {
        const putTitle = await axios.put("/putMovie", data);
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
          Create a new {props.selectedType}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ paddingBottom: "10px" }}>
          <TextField
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            value={title}
            id="title"
            color="primary"
            label="Title"
            variant="outlined"
          />
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-chip-label">Category</InputLabel>
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
                  value={category.category}
                  style={getStyles(
                    category.category,
                    selectedCategories,
                    theme
                  )}
                >
                  {category.category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="success"
            disabled={
              description === "" || title === "" || description.length > 180
            }
            onClick={putMovie}
          >
            Submit
          </Button>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ paddingBottom: "10px" }}>
          <TextField
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            value={description}
            multiline
            minRows={4}
            sx={{ width: "530px" }}
            id="description"
            color="primary"
            label="Description"
            variant="outlined"
          />
          <Typography variant="h5" component="p" sx={{ fontSize: "15px" }}>
            {description.length} / 180
          </Typography>
        </Stack>
      </div>
    );
  } else {
    getAllCategories();
  }
}

export default CreateMovie;
