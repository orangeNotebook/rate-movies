import "../App.css";
import CreateMovieOld from "./CreateMovieOld";
import React, { useState } from "react";
import axios from "axios";
import {
  Stack,
  Typography,
  TextField,
  Button,
  Paper,
  CardMedia,
  CardContent,
  Card,
  CardActionArea,
} from "@mui/material";

function CreateMovie(props) {
  const [title, setTitle] = useState("");
  const [apiTitles, setApiTitles] = useState([]);
  const [enableLegacy, setEnableLegacy] = useState(false);

  function putMovie(selectedMovie) {
    async function apifunc() {
      const data = {
        inputTerms: {
          title: selectedMovie.title,
          image: selectedMovie.image,
          description: selectedMovie.plot,
          categories: selectedMovie.genreList,
          type: props.selectedType,
          imdbId: selectedMovie.id,
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

  function getTitles(userInput) {
    axios
      .get(
        `https://imdb-api.com/en/API/${
          props.selectedType === "Movie" ? "SearchMovie" : "SearchSeries"
        }/pk_n23jchy4iuj8g6vap/${userInput}`
      )
      .then((response) => {
        console.log(response.data.results);
        setApiTitles(response.data.results);
      });
  }

  function getTitle(id) {
    axios
      .get(`https://imdb-api.com/en/API/Title/pk_n23jchy4iuj8g6vap/${id}`)
      .then((response) => {
        putMovie(response.data);
      });
  }

  function handleSelectMovie(selectedMovie) {
    if (
      window.confirm(
        "Are you sure you want to add " + selectedMovie.title + "?"
      )
    ) {
      getTitle(selectedMovie.id);
    }
  }

  if (
    enableLegacy ||
    (props.selectedType !== "Movie" && props.selectedType !== "Show")
  ) {
    return (
      <>
        <CreateMovieOld selectedType={props.selectedType}></CreateMovieOld>
        <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
          Go to the
          <Button
            onClick={() => {
              setEnableLegacy(false);
            }}
            sx={{ marginBottom: "3px", marginLeft: "3px" }}
          >
            updated form
          </Button>
        </Typography>
      </>
    );
  } else {
    return (
      <div className="create-movie-container">
        <Paper sx={{ padding: "10px" }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            sx={{ paddingBottom: "10px", textAlign: "center" }}
          >
            <TextField
              sx={{ width: { md: "25vw", xs: "auto" } }}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              value={title}
              id="title"
              color="primary"
              label="Title"
              variant="outlined"
            />
            <Button
              variant="contained"
              color="success"
              disabled={title === ""}
              onClick={() => {
                getTitles(title);
              }}
            >
              Find {props.selectedType}
            </Button>
          </Stack>
          {apiTitles ? (
            <>
              {apiTitles.map((apiTitle) => {
                return (
                  <Card
                    sx={{
                      margin: "10px",
                      width: { md: "30vw", xs: "85vw" },
                    }}
                    variant="outlined"
                  >
                    <CardActionArea
                      onClick={() => {
                        handleSelectMovie(apiTitle);
                      }}
                    >
                      <Stack direction={"row"} spacing={1}>
                        <CardMedia
                          component="img"
                          sx={{ width: "100px" }}
                          image={apiTitle.image}
                          alt={apiTitle.title + " image"}
                        />

                        <CardContent sx={{ padding: "5px" }}>
                          <Typography variant="h5" component="div">
                            {apiTitle.title}
                          </Typography>
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ color: "#a6a6a6" }}
                          >
                            {apiTitle.description}
                          </Typography>
                        </CardContent>
                      </Stack>
                    </CardActionArea>
                  </Card>
                );
              })}{" "}
            </>
          ) : (
            <></>
          )}
        </Paper>
        <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
          If the above does not work, try the
          <Button
            onClick={() => {
              setEnableLegacy(true);
            }}
            sx={{ marginBottom: "3px", marginLeft: "3px" }}
          >
            legacy form
          </Button>
        </Typography>
      </div>
    );
  }
}

export default CreateMovie;
