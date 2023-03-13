import React, { useState } from "react";
import Movie from "./Movie";

function AllMovies(props) {
  return (
    <div>
      <h2>All Movies</h2>{" "}
      {props.movies.map((movie) => {
        return (
          <>
            <Movie movie={movie} />
          </>
        );
      })}
    </div>
  );
}

export default AllMovies;
