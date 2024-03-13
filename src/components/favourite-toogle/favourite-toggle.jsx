import React from 'react'
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { setUser } from "../../redux/reducers/user";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import thumbUp from "../../assets/thumbup.svg"
import thumbDown from "../../assets/thumbdown.svg"


export const FavouriteToggle = ({ movie }) => {

    const { user, token } = useSelector((state) => state.user);
    const [isFavorite, setIsFavorite] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        if (user.FavouriteMovies && user.FavouriteMovies.includes(movie.id)) {
            setIsFavorite(true);
        }
    }, [user]);

    const addFavoriteMovie = () => {
        axios.post(
            `${process.env.API_URL}users/${user.Username}/movies/${movie.id}`,
            null,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    console.log("Failed to add");
                }
            })
            .then((user) => {
                if (user) {
                    localStorage.setItem("user", JSON.stringify(user));
                    dispatch(setUser({ user: user, token: token }));
                    setIsFavorite(true);
                    console.log("Succesfully added");
                }
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
            });
    };

    const removeFavoriteMovie = () => {
        axios.delete(
            `${process.env.API_URL}users/${user.Username}/movies/${movie.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    console.log("Failed to remove favorite movie");
                    return undefined;
                }
            })
            .then((user) => {
                if (user) {
                    localStorage.setItem("user", JSON.stringify(user));
                    dispatch(setUser({ user: user, token: token }));
                    setIsFavorite(false);
                    console.log("Succesfully removed");
                }
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
            });
    };
    return (
        <>{isFavorite ? (
            <Button
                variant="link"
                onClick={removeFavoriteMovie}
            >
                <img src={thumbDown} alt="" />
            </Button>
        ) : (
            <Button
                variant="link"
                onClick={addFavoriteMovie}
            >
                <img src={thumbUp} alt="" />
            </Button>
        )}
        </>
    )
}
