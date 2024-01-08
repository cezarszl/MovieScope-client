import React from 'react'
import star from "./star.svg"

export const StarRating = ({ rating }) => {

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= rating; i++) {
            stars.push(
                <img
                    key={i}
                    src={star}
                    alt={`Star ${i}`}

                />
            );
        }
        return stars;
    };
    return (
        <>{renderStars(rating)}</>
    )
}
