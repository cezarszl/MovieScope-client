import React from "react";

import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch("https://cezarszlmyflix-0212aa467a8d.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((key) => {
          return {
            id: key._id,
            title: key.Title,
            image: key.ImagePath,
            director: key.Director.Name,
            genre: key.Genre.Name
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    let similarMovies = movies.filter((movie) => movie.genre === selectedMovie.genre);
    return (
      <>
        <MovieView movie={selectedMovie} onBackClick={() => { setSelectedMovie(null); }} />
        <hr />
        <h2>Similiar Movies</h2>
        {similarMovies.map((movie) => {
          return <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }} />
        })}
      </>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => {
        return <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }} />
      })
      }
    </div >
  );
};
