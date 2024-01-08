import React from "react";
import PropTypes from "prop-types";
import { Container, Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FavouriteToggle } from "../favourite-toogle/favourite-toggle";
import "./movie-card.scss";

export const MovieCard = ({ movie }) => {
  return (
    <Container className="mc-container d-flex justify-content-center align-items-end">
      <Row>
        <Link to={`/movies/${encodeURIComponent(movie.id)}#nav`}>
          <Image className="movie-img" src={movie.image}></Image>
        </Link >
      </Row>
      <Row>
        <Col className="favourite-toggle"><FavouriteToggle movie={movie} /></Col>
      </Row>
    </Container >
  )
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired
  }).isRequired,
};