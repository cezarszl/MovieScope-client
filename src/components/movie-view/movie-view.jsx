import { useParams } from "react-router";
import { MovieInfo } from "./movie-info";
import { SimilarMovies } from "./similar-movies";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

export const MovieView = ({ token, setUser }) => {

  const { movieId } = useParams();
  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user);
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