import React from "react";
/**
 * @property {Function} - generates a pure functional component for header
 */
export default function Navbar() {
  return (
    <div className="dashboard__navcontainer">
      <div className="dashboard__title">
        <h1>Makeup</h1>
      </div>
      <div className="dashboard__menu">
        <span id="mtxt">brands, lipsticks, nailpolish and much more!!!</span>
      </div>
    </div>
  );
}
