import React from "react";
import "../sass/Dashboard.sass";
import Collage from "./Collage";
import Button from "@material-ui/core/Button";

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
	// let filter = false;
	let filter = true;
	return (
		<div className="main">
			<Navbar />

			<div className="container">
				{filter ? (
					<div className="rowgrid">
						<div className="filterContainer">
							<Button id="btn" variant="contained" size="small">
								&#60;
							</Button>
						</div>
						<div className="collage">
							<Collage />
						</div>
					</div>
				) : (
					<div className="rowgrid">
						<div className="collage">
							<Collage />
						</div>
						<div className="searchContainer">
							<Button id="btn" variant="contained" size="small">
								&#62;
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Dashboard;
