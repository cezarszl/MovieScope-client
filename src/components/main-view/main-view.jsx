import React from "react";
import { Col, Row, Alert } from "react-bootstrap";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { ProfileView } from "../profile-view/profile-view.jsx";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ScrollToAnchor } from "./scroll-to-anchor";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { setUser } from "../../redux/reducers/user";
import axios from "axios";
import "./main-view.scss"


export const MainView = () => {


  const movies = useSelector((state) => state.movies.list);
  const { user, token } = useSelector((state) => state.user);
  const filter = useSelector((state) =>
    state.movies.filter).trim().toLowerCase();
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      dispatch(setUser({ user: storedUser, token: storedToken }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!token) {
      return;
    }
    axios.get(`${process.env.API_URL}movies`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        const movieFromApi = response.data.map((key) => {
          return {
            id: key._id,
            title: key.Title,
            image: key.ImagePath,
            description: key.Description,
            director: key.Director.Name,
            genre: key.Genre.Name,
            rating: key.Rating,
            release_date: key.ReleaseDate
          };
        });
        dispatch(setMovies(movieFromApi));
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, [token]);


  return (
    <BrowserRouter>
      <ScrollToAnchor />
      <NavigationBar />
      <Row className="main-container d-flex justify-content-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col>
                    <LoginView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty</Col>
                ) : (
                  <Col className="movie-view justify-content-center" md={8}>
                    <MovieView user={user}
                      token={token}
                      setUser={setUser} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col></Col>
                ) : (
                  <>
                    {filteredMovies.map((movie) => (
                      <Col sm={6} lg={3} key={movie.id}>
                        <MovieCard
                          movie={movie}
                          token={token}
                          setUser={setUser}
                          user={user}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <ProfileView
                      user={user}
                      token={token}
                      movies={movies}
                      setUser={setUser}
                    />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};