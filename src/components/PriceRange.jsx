import React, { useState, useEffect } from "react";
import { useStateValue } from "./StateProvider";
import "../sass/PriceRange.sass";
function PriceRange() {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [state, dispatch] = useStateValue();

  const handleSetMinPrice = (e) => {
    e.preventDefault();
    setMinPrice(e.target.value);
  };

  const handleSetMaxPrice = async (e) => {
    e.preventDefault();
    setMaxPrice(e.target.value);
  };
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
  useEffect(() => {
    setMinPrice("");
    setMaxPrice("");
  }, [state.clearFilter]);
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
          placeholder="&#x20B9; 0"
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
          placeholder="&#x20B9; 99999"
          className="dashboard__searchInput priceRange__input"
        />
      </div>
    </div>
  );
}

export default PriceRange;
