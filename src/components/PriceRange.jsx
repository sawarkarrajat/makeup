import React from "react";
import "../sass/PriceRange.sass";
function PriceRange() {
  return (
    <div className="priceRange__container">
      <div className="MuiTypography-root MuiTreeItem-label MuiTypography-body1">
        price range
      </div>
      <div className="MuiTypography-root MuiTreeItem-label MuiTypography-body1">
        &nbsp;min.
        <input
          type="text"
          // value={}
          // onChange={(e) => e}
          placeholder="&#x20B9; 0"
          className="dashboard__searchInput priceRange__input"
        />
      </div>
      <div className="MuiTypography-root MuiTreeItem-label MuiTypography-body1">
        &nbsp;max.
        <input
          type="text"
          // value={}
          // onChange={(e) => e}
          placeholder="&#x20B9; 99999"
          className="dashboard__searchInput priceRange__input"
        />
      </div>
    </div>
  );
}

export default PriceRange;
