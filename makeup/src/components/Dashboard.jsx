import React, { useState, useEffect } from "react";
import "../sass/Dashboard.sass";
import Collage from "./Collage";
import Navbar from "./Navbar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import OptionsSelect from "./OptionsSelect";
import Panel from "./Panel";
import Services from "../services/Services";
import LoadingSkeleton from "./LoadingSkeleton";
import uniqid from "uniqid";
const hitApi = new Services();
var jsonData = [];
var target = "product_category=powder&product_type=blush";
const searchHistory = [];

const useStyles = makeStyles(() => ({
	TextField: {
		"& label.Mui-focused": {
			color: "#fc7fb2",
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: "#fc7fb2",
		},
	},
}));


function Dashboard(props) {
	const searchPrefix = "product_type=";
	const ref = React.createRef();
	const [showSkeleton, setShowSkeleton] = useState(true);
	const postman = (letter) => {
		hitApi
			.getJson(letter)
			.then(async (response) => {
				let element = document.getElementById("displayCards");
				element.scrollIntoView();
				jsonData = await response.data;
				if (jsonData.length === 0) {
					alert("no data found");
				}
				console.log(jsonData);
			})
			.then(() => {
				setShowSkeleton(false);
			})
			.catch((error) => {
				console.log(error);
				alert("failed to get json");
			});
	};

	useEffect(() => {
		postman(target);
	}, []);

	const classes = useStyles();
	const [filter, setFilter] = useState(false);
	const [resetfilter, setResetfilter] = useState(true);
	const brandList = [
		"almay",
		"alva",
		"anna sui",
		"annabelle",
		"benefit",
		"boosh",
		"burt's bees",
		"butter london",
		"c'est moi",
		"cargo cosmetics",
		"china glaze",
		"clinique",
		"coastal classic creation",
		"colourpop",
		"covergirl",
		"dalish",
		"deciem",
		"dior",
		"dr. hauschka",
		"e.l.f.",
		"essie",
		"fenty",
		"glossier",
		"green people",
		"iman",
		"l'oreal",
		"lotus cosmetics usa",
		"maia's mineral galaxy",
		"marcelle",
		"marienatie",
		"maybelline",
		"milani",
		"mineral fusion",
		"misa",
		"mistura",
		"moov",
		"nudus",
		"nyx",
		"orly",
		"pacifica",
		"penny lane organics",
		"physicians formula",
		"piggy paint",
		"pure anada",
		"rejuva minerals",
		"revlon",
		"sally b's skin yummies",
		"salon perfect",
		"sante",
		"sinful colours",
		"smashbox",
		"stila",
		"suncoat",
		"w3llpeople",
		"wet n wild",
		"zorah",
		"zorah biocosmetiques",
	];
	const product_tags = [
		"Canadian",
		"CertClean",
		"Chemical Free",
		"Dairy Free",
		"EWG Verified",
		"EcoCert",
		"Fair Trade",
		"Gluten Free",
		"Hypoallergenic",
		"Natural",
		"No Talc",
		"Non-GMO",
		"Organic",
		"Peanut Free Product",
		"Sugar Free",
		"USDA Organic",
		"Vegan",
		"alcohol free",
		"cruelty free",
		"oil free",
		"purpicks",
		"silicone free",
		"water free",
	];
	const product_category = [
		"powder",
		"cream",
		"gel",
		"pencil",
		"palette",
		"liquid",
		"contour",
		"bb_cc",
		"concealer",
		"mineral",
		"highlighter",
		"lipstick",
		"lip_gloss",
		"lip_stain",
	];
	const product_type = [
		"blush",
		"bronzer",
		"eyebrow",
		"eyeliner",
		"eyeshadow",
		"foundation",
		"lip_liner",
		"lipstick",
		"mascara",
		"nail_polish",
	];
	const [searchedText, setSearchedText] = useState("");

	let skeletonArray = [];

	for (let i = 0; i < 8; i++) {
		skeletonArray.push(<LoadingSkeleton key={uniqid()} />);
	}

	const handleChange = (event) => {
		setSearchedText(event.currentTarget.value);
	};

	let filterObject = {
		brand: "",
		tag: "",
		category: "",
		productType: "",
	};

	const setBrand = (b) => {
		filterObject.brand = ("brand=" + b).trim();
		// console.log("value of brand", filterObject.brand);
	};

	const setTag = (t) => {
		filterObject.tag = ("product_tags=" + t).trim();
		// console.log("value of tag", filterObject.tag);
	};

	const setCategory = (c) => {
		filterObject.category = ("product_category=" + c).trim();
		// console.log("value of category", filterObject.category);
	};

	const setProductType = (pt) => {
		filterObject.productType = ("product_type=" + pt).trim();
		// console.log("value of product type", filterObject.productType);
	};

	const applyFilter = () => {
		setShowSkeleton(true);
		let filterString = "";

		for (let [, value] of Object.entries(filterObject)) {
			if (filterString.length === 0 && `${value}`.length > 2) {
				filterString = filterString.concat(`${value}`);
				// console.log("filterString is", filterString);
			} else if (filterString.length > 2 && `${value}`.length > 2) {
				filterString = filterString.concat("&", `${value}`);
				// console.log("filterString is", filterString);
			}
		}
		postman(filterString);
	};

	const filtersReset = () => {
		// console.log("now reset is", resetfilter);
		setResetfilter(!resetfilter);
	};

	const handleClear = () => {
		setSearchedText("");
	};

	const handleKey = (event) => {
		// console.log("in handlekey");
		if (event.keyCode === 13 || event.which === 13 || event.key === "Enter") {
			setShowSkeleton(true);
			event.preventDefault();
			searchHistory.push(searchedText);
			let newString = searchPrefix.concat(searchedText.trim());
			console.log("search history contains", searchHistory);
			postman(newString);
		}
	};

	const handleClick = (data) => {
		props.history.push("/ProductDetails", { itemInfo: data });
	}

	return (
		<div className="main">
			<Navbar />

			<div className="container">
				{filter ? (
					<div className="rowgrid">
						<div className="filterContainer">
							<div className="filters">
								<OptionsSelect
									ref={ref}
									type="Brands"
									arrayOfItems={brandList}
									setItem={setBrand}
									reset={resetfilter}
									toggleReset={filtersReset}
								/>
								<OptionsSelect
									ref={ref}
									type="Product type"
									arrayOfItems={product_type}
									setItem={setProductType}
									reset={resetfilter}
									toggleReset={filtersReset}
								/>
								<OptionsSelect
									ref={ref}
									type="category"
									arrayOfItems={product_category}
									setItem={setCategory}
									reset={resetfilter}
									toggleReset={filtersReset}
								/>
								<OptionsSelect
									ref={ref}
									type="tags"
									arrayOfItems={product_tags}
									setItem={setTag}
									reset={resetfilter}
									toggleReset={filtersReset}
								/>
								<Button
									id="btn"
									variant="contained"
									size="small"
									onClick={applyFilter}
								>
									apply
								</Button>
								<Button
									id="btn"
									variant="contained"
									size="small"
									onClick={filtersReset}
								>
									reset
								</Button>
							</div>
							<Button
								id="btn"
								variant="contained"
								size="small"
								onClick={() => {
									setFilter(!filter);
								}}
							>
								&#60; goto search
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
							<Button
								id="btn"
								variant="contained"
								size="small"
								onClick={() => {
									setFilter(!filter);
								}}
							>
								goto filters &#62;
							</Button>
							<div className="search">
								<TextField
									label="Search"
									id="searchField"
									fullWidth
									classes={{
										root: classes.TextField,
									}}
									InputProps={{
										endAdornment: (
											<InputAdornment position="start">
												<IconButton size="small">
													<SearchIcon />
												</IconButton>
											</InputAdornment>
										),
									}}
									variant="standard"
									value={searchedText}
									onChange={(event) => {
										handleChange(event);
									}}
									onKeyUp={(event) => {
										return handleKey(event);
									}}
								/>
								<Button
									id="btn"
									variant="contained"
									size="small"
									onClick={() => {
										handleClear();
									}}
								>
									clear
								</Button>
							</div>
						</div>
					</div>
				)}

				<div id="displayCards" className="someCards">
					{showSkeleton ? (
						<>{skeletonArray.map((data) => data)}</>
					) : (
						<>
							{jsonData.map((item) => (
								<Panel key={item.id} info={item} clicked={handleClick} />
							))}
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
