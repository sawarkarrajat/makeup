import React, { useState, useEffect } from "react";
import "../sass/Checkbox.sass";
import { useStateValue } from "./StateProvider";

function Checkbox({ filterLabel, label }) {
  const [check, setCheck] = useState(false);
  const [
    { brandFiltersArray, tagFiltersArray, clearFilter },
    dispatch,
  ] = useStateValue();
  const handleChange = (event) => {
    let item = {
      label: label,
    };
    console.log("event.target.checked", event.target.checked);
    setCheck(!check);
    if (event.target.checked) {
      if (filterLabel === "brands") {
        dispatch({
          type: "ADD_TO_BRAND_FILTER",
          item: item,
        });
      } else {
        dispatch({
          type: "ADD_TO_TAG_FILTER",
          item: item,
        });
      }
    } else {
      if (filterLabel === "brands") {
        dispatch({
          type: "REMOVE_FROM_BRAND_FILTER",
          item: item,
        });
      } else {
        dispatch({
          type: "REMOVE_FROM_TAG_FILTER",
          item: item,
        });
      }
    }
    console.log("value in state", brandFiltersArray, tagFiltersArray);
  };
  useEffect(() => {
    if (brandFiltersArray.includes(label) || tagFiltersArray.includes(label)) {
      console.log(
        "contains brand/tag",
        brandFiltersArray.includes(label),
        tagFiltersArray.includes(label)
      );
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, [brandFiltersArray, tagFiltersArray, label]);
  useEffect(() => {
    setCheck(false);
  }, [clearFilter]);
  return (
    <label className="checkbox">
      <span className="checkbox__input">
        <input
          type="checkbox"
          name="checkbox"
          checked={check}
          onChange={(event) => handleChange(event)}
        />
        <span className="checkbox__control">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path
              fill="none"
              stroke="white"
              strokeWidth="3"
              d="M1.73 12.91l6.37 6.37L22.79 4.59"
            />
          </svg>
        </span>
      </span>
      <span className="checkbox__label">{!label ? "none" : label}</span>
    </label>
  );
}

export default Checkbox;
