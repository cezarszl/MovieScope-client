import React from 'react'
import { MovieCard } from "../movie-card/movie-card";
export const FavouriteMovies = ({ favouriteMoviesList, token, setUser, user }) => {
    return (
        <>
            <h4>Favourite movies</h4>
            {favouriteMoviesList.map((movie) => {
                return (
                    <div key={movie.id}>
                        <MovieCard
                            movie={movie}
                            token={token}
                            setUser={setUser}
                            user={user}
                        />
                    </div>
                );
            })}
        </>
    )
}


