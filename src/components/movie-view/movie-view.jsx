import { useParams } from "react-router";
import { MovieInfo } from "./movie-info";
import { SimilarMovies } from "./similar-movies";
import { Container } from "react-bootstrap";

export const MovieView = ({ movies, token, setUser, user }) => {

  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  const selectedMovie = movies.find((movie) => movie.id === movieId);
  const similarMovies = movies.filter((movie) => {
    return movie.id !== movieId && movie.genre === selectedMovie.genre;
  });
  console.log(movie.genre);
  return (
    <Container>
      <MovieInfo movie={movie} />
      <SimilarMovies similarMovies={similarMovies} token={token} setUser={setUser} user={user} />
    </Container>


  );
};