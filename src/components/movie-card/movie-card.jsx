import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const MovieCard = ({ movie, token, setUser, user }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    if (user.FavouriteMovies && user.FavouriteMovies.includes(movie.id)) {
      setIsFavorite(true);
    }
  }, [user]);

  const addFavoriteMovie = () => {
    fetch(
      `https://cezarszlmyflix-0212aa467a8d.herokuapp.com/users/${user.Username}/movies/${movie.id}`,
      { method: "POST", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          console.log("Failed to add");
        }
      })
      .then((responseUser) => {
        if (responseUser) {
          localStorage.setItem("user", JSON.stringify(responseUser));
          setUser(responseUser);
          setIsFavorite(true);
          console.log("Succesfully added");
          console.log(responseUser.FavouriteMovies);
        }
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };

  const removeFavoriteMovie = () => {
    fetch(
      `https://cezarszlmyflix-0212aa467a8d.herokuapp.com/users/${user.Username}/movies/${movie.id}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("failed to remove fav movie");
          return undefined;
        }
      })
      .then((user) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setIsFavorite(false);
        }
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
        <Col className="col-3">
          {isFavorite ? (
            <Button
              variant="link"
              onClick={removeFavoriteMovie}
            >
              Remove from favourites
            </Button>
          ) : (
            <Button
              variant="link"
              onClick={addFavoriteMovie}
            >
              Add to favourites
            </Button>
          )}
        </Col>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired
  }).isRequired,
};