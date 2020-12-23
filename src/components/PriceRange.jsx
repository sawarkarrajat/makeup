import React, { useState, useEffect } from "react";
import { useStateValue } from "./StateProvider";
import "../sass/PriceRange.sass";

/**
 * price range component
 * @property {function}
 */
function PriceRange() {
  const [state, dispatch] = useStateValue();
  const [minPrice, setMinPrice] = useState(state.priceMin);
  const [maxPrice, setMaxPrice] = useState(state.priceMax);
  /**
   * handles minimum price change
   * @param {Object} e
   */
  const handleSetMinPrice = (e) => {
    e.preventDefault();
    setMinPrice(e.target.value);
  };

  /**
   * handles maximum price change
   *
   * @param {Object} e
   */
  const handleSetMaxPrice = async (e) => {
    e.preventDefault();
    setMaxPrice(e.target.value);
  };

  /**
   * side effect to fire action to add price change to global state
   */
  useEffect(() => {
    let item = {
      min: minPrice,
      max: maxPrice,
    };
    dispatch({
      type: "ADD_PRICE_RANGE",
      item: item,
    });
  }, [minPrice, maxPrice, dispatch]);

  /**
   * side effect to reset prices
   */
  useEffect(() => {
    setMinPrice("");
    setMaxPrice("");
  }, [state.clearFilter]);

  /**
   * side effect to check if prices already exist in oldState of application
   */
  useEffect(() => {
    if (state.priceMin) {
      setMinPrice(state.priceMin);
    }
    if (state.priceMax) {
      setMaxPrice(state.priceMax);
    }
  }, [state.priceMin, state.priceMax]);
  return (
    <div className="priceRange__container">
      <div className="MuiTypography-root MuiTreeItem-label MuiTypography-body1">
        &#8226; price range
      </div>
      <div>
        <p className="MuiTypography-root MuiTreeItem-label MuiTypography-body1 priceRange__Subheading">
          &#8226; minimum
        </p>
        <input
          type="text"
          value={minPrice}
          onChange={(e) => handleSetMinPrice(e)}
          placeholder="&#36; 0.00"
          className="dashboard__searchInput priceRange__input"
        />
      </div>
      <div>
        <p className="MuiTypography-root MuiTreeItem-label MuiTypography-body1 priceRange__Subheading">
          &#8226; maximum
        </p>
        <input
          type="text"
          value={maxPrice}
          onChange={(e) => handleSetMaxPrice(e)}
          placeholder="&#36; 999.99"
          className="dashboard__searchInput priceRange__input"
        />
      </div>
    </div>
  );
}

export default PriceRange;
