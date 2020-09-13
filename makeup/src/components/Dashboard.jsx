import React, { useEffect, useState } from "react";
import "../sass/Dashboard.sass";
import Navbar from "./Navbar";
import searchIcon from "../asset/search.png";
import crossIcon from "../asset/cross.png";
import makeupData from "../makeupData.json";
/**
 * Root page of site or main page for SPA
 */
function Dashboard() {
	const [searchText, setSearchText] = useState("");

	return (
		<div className="dashboard__main">
			<Navbar />
			<div className="dashboard__container">
				<div className="dashboard__filter">
					<h3>filters</h3>
				</div>
				<div className="dashboard__aside">
					<div className="dashboard__searchPanel">
						<input
							type="text"
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							autoComplete="on"
							placeholder="search for products here..."
							className="dashboard__searchInput"
						/>
						<button className="dashboard__searchButton">
							search
							<img src={searchIcon} alt="s" />
						</button>
						<button className="dashboard__clearButton">
							clear
							<img src={crossIcon} alt="x" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
