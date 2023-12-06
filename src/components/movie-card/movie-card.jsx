import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return <div
    onClick={() => {
      onMovieClick(movie);
    }}
  >{movie.title}</div>;
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
}; 
