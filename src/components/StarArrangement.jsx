import React from "react";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
/**
 * component to render filled stars
 *
 * @param {propType} count no. of filled stars
 */
const FillStars = ({ count }) => {
  return (
    <>
      {Array(count)
        .fill()
        .map((_, i) => (
          <StarIcon key={i + Math.random()} />
        ))}
    </>
  );
};

/**
 * component to render blank stars
 *
 * @param {propType} count no. of blank stars
 */
const BlankStars = ({ count }) => {
  return (
    <>
      {Array(count)
        .fill()
        .map((_, i) => (
          <StarBorderIcon key={i + Math.random()} />
        ))}
    </>
  );
};

/**
 * component to render a line stars
 * @param {propType} props
 */
const StarArrangement = ({ fill, blank }) => {
  return (
    <div className="StarRating__arrangement">
      <FillStars count={fill} />
      <BlankStars count={blank} />
    </div>
  );
};

export default StarArrangement;
