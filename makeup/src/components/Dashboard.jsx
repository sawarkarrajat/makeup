import React from "react";
import "../sass/Dashboard.sass";
import Collage from "./Collage";

const Navbar = () => {
  return (
    <div className="navcontainer">
      <div className="title">
        <h1>Makeup</h1>
      </div>
      <div className="menu">
        <span id="mtxt">brands</span>
        <span id="mtxt">lipstick</span>
        <span id="mtxt">nail polish</span>
      </div>
    </div>
  );
};

function Dashboard() {
  return (
    <div className="main">
      <Navbar />

      <div className="container">
        <div className="rowgrid">
          <div className="filter"></div>
          <div className="collage">
            <Collage />
          </div>
          <div className="search"></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
