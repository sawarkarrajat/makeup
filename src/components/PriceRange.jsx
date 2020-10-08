import React, { useState, useEffect } from "react";
import { useStateValue } from "./StateProvider";
import "../sass/PriceRange.sass";
function PriceRange() {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [state, dispatch] = useStateValue();

  const handleSetMinPrice = async (e) => {
    e.preventDefault();
    await setMinPrice(e.target.value);
  };

  const handleSetMaxPrice = async (e) => {
    e.preventDefault();
    await setMaxPrice(e.target.value);
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
        price range
      </div>
      <div className="MuiTypography-root MuiTreeItem-label MuiTypography-body1">
        &nbsp;minimum
        <input
          type="text"
          value={minPrice}
          onChange={(e) => handleSetMinPrice(e)}
          placeholder="&#x20B9; 0"
          className="dashboard__searchInput priceRange__input"
        />
      </div>
      <div className="MuiTypography-root MuiTreeItem-label MuiTypography-body1">
        &nbsp;maximum
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
