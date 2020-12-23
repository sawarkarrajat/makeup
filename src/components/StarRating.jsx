import React, { useState, useEffect, useCallback } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useStateValue } from "./StateProvider";
import StarArrangement from "./StarArrangement";
import "../sass/StarRating.sass";

/**
 * star rating component
 * @property {function}
 */
function StarRating() {
  const [state, dispatch] = useStateValue();
  const [rating, setRating] = useState(Number(0));

  /**
   * side effect to reset rating on clearFilter action
   */
  useEffect(() => {
    console.log("called from useeffect clear star rating");
    setRating(Number(0));
  }, [state.clearFilter]);

  /**
   * handles rating change event
   * @param {Object} event
   */
  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };
  const checkRating = useCallback(() => {
    if (state.rating !== null) {
      setRating(Number(state.rating));
    }
  }, [state.rating]);
  /**
   * side effect to check oldstate rating's existance
   */
  useEffect(() => {
    checkRating();
  }, [checkRating]);

  /**
   * side effect to dispatch update action of rating on
   * rating change.
   */
  useEffect(() => {
    dispatch({
      type: "UPDATE_RATING",
      item: rating,
    });
  }, [rating, dispatch]);

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
