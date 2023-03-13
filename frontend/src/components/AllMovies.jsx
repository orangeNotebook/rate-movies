import React from "react";

function AllMovies(props) {
  return (
    <div>
      <h2>All Movies</h2>{" "}
      {props.movies.map((movie) => {
        return (
          <>
            <p>{movie.title}</p>
          </>
        );
      })}
    </div>
  );
}

export default AllMovies;
