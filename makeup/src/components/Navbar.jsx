import React from 'react';
/**
 * @property {Function} - generates a pure functional component
 */
export default function Navbar() {
  return (
    <div className="navcontainer">
    <div className="title">
      <h1>Makeup</h1>
    </div>
    <div className="menu">
      <span id="mtxt">brands, lipsticks, nailpolish and much more!!!</span>
    </div>
  </div>
  )
}
