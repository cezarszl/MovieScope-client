import React from "react";

import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

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

  return (
    <Container>
      <Row className="justify-content-md-center">
        {!user ? (
          <Col className="mt-5" md={5}>
            <LoginView onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }} />
            or
            <SignupView />
          </Col>

        ) : selectedMovie ? (
          <Col md={8}>
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
          </Col>
        ) : movies.length === 0 ? (
          <div>The list is empty</div>
        ) : (
          <>
            {movies.map((movie) => (
              <Col className="mt-5 mb-5" md={3}>
                <MovieCard movie={movie} onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
                />
              </Col>
            ))}


          </>
        )
        }
      </Row >
      <Row className="justify-content-md-center">
        {user && <Button style={{ width: "200px" }} onClick={() => { setUser(null); setToken(null); localStorage.clear() }} >Logout</Button>}
      </Row>
    </Container>
  );
};
