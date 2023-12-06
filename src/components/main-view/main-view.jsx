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
            director: key.Director.Name
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
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
