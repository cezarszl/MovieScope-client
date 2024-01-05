import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Col, Row, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({ movies, token, setUser, user }) => {

  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  const selectedMovie = movies.find((movie) => movie.id === movieId);
  const similarMovies = movies.filter((movie) => {
    return movie.id !== movieId && movie.genre === selectedMovie.genre;
  });
  console.log(movie.genre);
  return (
    <>
      <Row>
        <Col>
          <img className="w-50" src={movie.image} />
        </Col>
      </Row>
      <Row>
        <span>Title: </span>
        <span>{movie.title}</span>
      </Row>
      <Row>
        <span>Director: </span>
        <span>{movie.director}</span>
      </Row>
      <Row>
        <Link to={`/`}>
          <Button className="back-button">Back</Button>
        </Link>
      </Row>
      <h2>Similar Movies</h2>
      <Row className="justify-content-center">
        {
          similarMovies.length !== 0 ?
            similarMovies.map((movie) => (
              <Col key={movie._id}>
                <MovieCard
                  movie={movie}
                  token={token}
                  setUser={setUser}
                  user={user}
                />
              </Col>
            ))
            : <Col>
              <p>There are no similar Movies</p>
            </Col>
        }
      </Row>
    </>


  );
};