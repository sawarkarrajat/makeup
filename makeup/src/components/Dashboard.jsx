import React, { useState } from "react";
import "../sass/Dashboard.sass";
import Navbar from "./Navbar";
import searchIcon from "../asset/search.png";
import crossIcon from "../asset/cross.png";
import makeupData from "../makeupData.json";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import Checkbox from "./Checkbox";
/**
 * Root page of site or main page for SPA
 */
function Dashboard() {
	let muData = Object.assign([{}], makeupData);
	const extractionLabels = (label) => {
		return [...new Set(muData.map((item) => item[label]))];
	};
	const extractionTaglist = () => {
		let tags = [];

		muData.forEach((item) => {
			item.tag_list.forEach((tag) => {
				if (!tags.includes(tag)) {
					tags.push(tag);
				}
			});
		});
		return tags;
	};
	const [searchText, setSearchText] = useState("");
	const brand = extractionLabels("brand");
	const category = extractionLabels("category");
	const product_type = extractionLabels("product_type");
	const tag_list = extractionTaglist();

	const [currentlyDisplayedCards, setCurrentlyDisplayedCards] = useState([]);

	const autoCompleteSearch = (searchedText) => {
		setSearchText(searchedText);
		let matches = muData.filter((product) => {
			const regex = new RegExp(`^${searchedText}`, "gi");

			return (
				product.brand?.match(regex) ||
				product.category?.match(regex) ||
				product.product_type?.match(regex)
			);
		});
		console.log("value in matches", matches);
		setCurrentlyDisplayedCards(matches);
	};

	return (
		<div className="dashboard__main">
			<Navbar />
			<div className="dashboard__container">
				<div className="dashboard__filter">
					<h3>filters</h3>
					<hr />
					<br />
					<div className="dashboard__filterLabel">
						<TreeView
							defaultCollapseIcon={<ExpandMoreIcon />}
							defaultExpandIcon={<ChevronRightIcon />}
						>
							<TreeItem nodeId="1" label="Applications">
								<Checkbox label={brand[0]} />
								<Checkbox label={brand[1]} />
								<Checkbox label={brand[2]} />
								<Checkbox label={brand[3]} />
							</TreeItem>
						</TreeView>
					</div>
				</div>
				<div className="dashboard__aside">
					<div className="dashboard__searchPanel">
						<input
							type="text"
							value={searchText}
							onChange={(e) => autoCompleteSearch(e.target.value)}
							autoComplete="on"
							placeholder="search for products here..."
							className="dashboard__searchInput"
						/>
						<button className="dashboard__searchButton">
							search
							<img src={searchIcon} alt="search" />
						</button>
						<button className="dashboard__clearButton">
							clear
							<img src={crossIcon} alt="cross" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
