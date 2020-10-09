import React, { useState, useEffect } from "react";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useStateValue } from "./StateProvider";
import "../sass/StarRating.sass";
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
const StarArrangement = ({ fill, blank }) => {
  return (
    <div className="StarRating__arrangement">
      <FillStars count={fill} />
      <BlankStars count={blank} />
    </div>
  );
};

function StarRating() {
  const [rating, setRating] = useState(0);
  const [state, dispatch] = useStateValue();

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };
  useEffect(() => {
    dispatch({
      type: "UPDATE_RATING",
      item: rating,
    });
  }, [rating, dispatch]);
  useEffect(() => {
    setRating(Number(0));
  }, [state.clearFilter]);
  return (
    <div className="starRating__container">
      <FormControl component="fieldset">
        <FormLabel component="legend">&#8226; rating</FormLabel>
        <RadioGroup
          aria-label="rating"
          name="rating"
          value={rating}
          onChange={handleRatingChange}
        >
          <FormControlLabel
            value={1}
            control={<Radio />}
            label={<StarArrangement fill={1} blank={4} />}
          />
          <FormControlLabel
            value={2}
            control={<Radio />}
            label={<StarArrangement fill={2} blank={3} />}
          />
          <FormControlLabel
            value={3}
            control={<Radio />}
            label={<StarArrangement fill={3} blank={2} />}
          />
          <FormControlLabel
            value={4}
            control={<Radio />}
            label={<StarArrangement fill={4} blank={1} />}
          />
          <FormControlLabel
            value={5}
            control={<Radio />}
            label={<StarArrangement fill={5} blank={0} />}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default StarRating;
