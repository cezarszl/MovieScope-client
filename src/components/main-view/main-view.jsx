import React from "react";

import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://cezarszlmyflix-0212aa467a8d.herokuapp.com/movies", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => response.json())
      .then((data) => {
        console.log("Movies from API :", data);
        const movieFromApi = data.map((key) => {
          return {
            id: key._id,
            title: key.Title,
            image: key.ImagePath,
            director: key.Director.Name,
            genre: key.Genre.Name
          };
        });
        setMovies(movieFromApi);
      })

  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => { setSelectedMovie(null) }} />

  }

  if (movies.length === 0) {
    return <div>The list is empty</div>
  }
  return (
    <>
      <div>

        {movies.map((movie) => (
          <MovieCard movie={movie} onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }} />
        ))}
      </div>
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear() }} >Logout</button>
    </>
  )
};
