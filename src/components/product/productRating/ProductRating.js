import React from "react";
import StarRatings from "react-star-ratings";

const ProductRating = ({ averageRating, noOfRatings }) => {
  const rating = typeof averageRating === 'number' ? averageRating : 0;
  return (
    <>
      {rating > 0 && (
        <>
          <StarRatings
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="#F6B01E"
            rating={rating}
            editing={false}
          />
          ({noOfRatings})
        </>
      )}
    </>
  );
};

export default ProductRating;
