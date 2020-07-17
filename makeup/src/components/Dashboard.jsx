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
/**
 * @type{const} hitApi
 * @description store instance of services
 */
const hitApi = new Services();
/**
 * @type{variable} jsonData
 * @description stores json format data to display in ui
 */
var jsonData = [],
	totalNoOfPages = 0;
/**
 * @type{variable}
 * @description stores initail target link to display cards
 */
var target = "product_category=powder&product_type=blush";
/**
 * @type{StringArray}
 * @description stores search history of components
 */
const searchHistory = [];
/**
 * @type{Object}
 * @description stores style object
 */
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

/**
 * Root page of site or main page for SPA
 * @param {Object} props
 */
function Dashboard(props) {
	/**
	 * @type{constant}
	 * @description stores prefix string
	 */
	const searchPrefix = "product_type=";
	/**
	 * @type{constant}
	 * @description stores reference
	 */
	const ref = React.createRef();
	/**
	 * @type {hook}
	 * @description controls when to show skeleton
	 */
	const [showSkeleton, setShowSkeleton] = useState(true);
	const [showNoResultMsg, setshowNoResultMsg] = useState(false);
	const [pageContainer, setPageContainer] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	// const [pageContainer] = useState([]);
	let itemsArray = [];
	/**
	 * @property {Function} - used to hit api with filters
	 */
	const scrollinview = () => {
		let element = document.getElementById("displayCards");
				element.scrollIntoView();
	}
	const paginationSequence = () => {
		console.log("value in hit api pagecontainer", pageContainer);
					totalNoOfPages = Math.ceil(jsonData.length / 16);
					divideData();
					setShowSkeleton(false);
					setshowNoResultMsg(false);
	}
	const divideData = () => {
		var cursor = 0;
		let tempcontainer = [];
		setPageContainer([]);
		for (let index = 0; index < totalNoOfPages; index++) {
			for (let item = 0; item < 16; item++) {
				if (jsonData[cursor] !== undefined) {
					itemsArray.push(jsonData[cursor]);
					cursor++;
				} else {
					continue;
				}
			}
			tempcontainer.push(itemsArray);
			console.log("data in page container", pageContainer);
			itemsArray = [];
		}
		setPageContainer(tempcontainer);
	};
	const postman = (letter) => {
		const divideData = () => {
			var cursor = 0;
			let tempcontainer = [];
			setPageContainer([]);
			for (let index = 0; index < totalNoOfPages; index++) {
				for (let item = 0; item < 16; item++) {
					// console.log("value in jsondata[cursor]", cursor, jsonData[cursor]);
					if (jsonData[cursor] !== undefined) {
						itemsArray.push(jsonData[cursor]);
						cursor++;
						// console.log("data in items Array", itemsArray);
					} else {
						continue;
					}
				}
				tempcontainer.push(itemsArray);
				console.log("data in page container", pageContainer);
				itemsArray = [];
			}
			setPageContainer(tempcontainer);
		};

		hitApi
			.getJson(letter)
			.then(async (response) => {
				/**
				 * @type {variable}
				 * @description stores element
				 */
				console.log("data in page container", pageContainer);
				
				jsonData = await response.data;
				scrollinview();
				if (jsonData.length === 0) {
					setshowNoResultMsg(true);
				} else {
					paginationSequence();
				}
				console.log(jsonData);
			})
			.catch((error) => {
				console.log(error);
				setshowNoResultMsg(true);
			});
	};
	/**
	 * @property {Funciton} - used to load side effects
	 */
	useEffect(() => {
		if (jsonData.length === 0) {
		postman(target);
		} else {
			paginationSequence();
		}
	}, []);
	/**
	 * @type {Object}
	 * @description instance of usestyles
	 */
	const classes = useStyles();
	/**
	 * @type {hook}
	 * @description  used to set filters visiblity
	 */
	const [filter, setFilter] = useState(false);
	/**
	 * @type {hook}
	 * @description used to reset filters
	 */
	const [resetfilter, setResetfilter] = useState(true);
	/**
	 * @type{Array}
	 * @description- a String array
	 */
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
	/**
	 * @type {Array}
	 * @description a String array
	 */
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
	/**
	 * @type {Array}
	 * @description a String array
	 */
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
	/**
	 * @type {Array}
	 * @description a String array
	 */
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
	/**
	 * @type {hook}
	 * @description used to assign searched text
	 */

	const [searchedText, setSearchedText] = useState("");
	/**
	 * @type {variable}
	 * @description used to store an Array of skeletons
	 */
	let skeletonArray = [];

	for (let i = 0; i < 8; i++) {
		skeletonArray.push(<LoadingSkeleton key={uniqid()} />);
	}
	/**
	 * @property {Function} - used to set searched text
	 */
	const handleChange = (event) => {
		setSearchedText(event.currentTarget.value);
	};
	/**
	 * @type {Object}
	 * @description used to store filters
	 */
	let filterObject = {
		brand: "",
		tag: "",
		category: "",
		productType: "",
	};
	/**
	 * @property {Funciton} - used to set brand
	 * @param {String} b - contains brand name string
	 */
	const setBrand = (b) => {
		filterObject.brand = ("brand=" + b).trim();
	};
	/**
	 *@property {Funciton} - used to set tag
	 * @param {String} t - contains tag name string
	 */
	const setTag = (t) => {
		filterObject.tag = ("product_tags=" + t).trim();
	};
	/**
	 *@property {Funciton} - used to set category
	 * @param {String} c - contains category name string
	 */
	const setCategory = (c) => {
		filterObject.category = ("product_category=" + c).trim();
	};
	/**
	 * @property {Funciton} - used to set product type
	 * @param {String} pt - contains produtuct type string
	 */
	const setProductType = (pt) => {
		filterObject.productType = ("product_type=" + pt).trim();
	};
	/**
	 * @property {Funciton} - method used to apply filter and hit api
	 */
	const applyFilter = () => {
		setShowSkeleton(true);
		/**
		 * @type {variable}
		 * @description substing of url for filters
		 */
		let filterString = "";

		for (let [, value] of Object.entries(filterObject)) {
			if (filterString.length === 0 && `${value}`.length > 2) {
				filterString = filterString.concat(`${value}`);
			} else if (filterString.length > 2 && `${value}`.length > 2) {
				filterString = filterString.concat("&", `${value}`);
			}
		}
		postman(filterString);
	};
	/**
	 * @property {Funciton} - used to reset filters
	 */
	const filtersReset = () => {
		setResetfilter(!resetfilter);
	};
	/**
	 * @property {Funciton} - used to clear searched text field
	 */
	const handleClear = () => {
		setSearchedText("");
	};
	/**
	 * @property {Funciton} - used to handle keyup event for enter press
	 */
	const handleKey = (event) => {
		if (
			event.keyCode === 13 ||
			event.which === 13 ||
			event.key === "Enter" ||
			event.button === 0
		) {
			setShowSkeleton(true);
			event.preventDefault();
			searchHistory.push(searchedText);
			/**
			 * @type {variable}
			 * @description stores url string for searched text
			 */
			let newString = searchPrefix.concat(searchedText.trim());
			postman(newString);
		}
	};
	/**
	 * @property {Funciton} - handles click on product cards
	 */
	const handleClick = (data) => {
		props.history.push("/ProductDetails", { itemInfo: data });
	};
	
	const NoResultMsg = () => {
		return <h2 id="noResult">Sorry No Results Found</h2>;
	};
	const handlePagination = (index) => {
		console.log("in handlepagination", index);
		setCurrentPage(index);
		scrollinview();
		console.log("in handlepagination currentpage", currentPage);
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
												<IconButton
													size="small"
													onClick={(event) => {
														return handleKey(event);
													}}
												>
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

				{showSkeleton ? (
				<div id="displayCards" className="someCards">
						{skeletonArray.map((data) => data)}
					</div>
				) : (
					<>
						{showNoResultMsg ? (
							<NoResultMsg />
					) : (
						<>
								<div id="displayCards" className="someCards">
									{pageContainer[currentPage] &&
										pageContainer[currentPage].map((item) => (
								<Panel key={item.id} info={item} clicked={handleClick} />
							))}
								</div>
										<div id="pagination" className="paginationButtons">
										<Button
												id="btn_first"
												variant="contained"
												size="small"
												onClick={() => {
													handlePagination(0);
												}}
											>
												first
											</Button>
									{pageContainer &&
										pageContainer.map((item, index) => (
											<Button
												key={index}
												id={"btn_" + index}
												variant="contained"
												size="small"
												onClick={() => {
													handlePagination(index);
												}}
												style={currentPage === index ? { backgroundColor: "#ffd5d5"}:{}}
											>
												{index + 1}
											</Button>
										))}
											<Button
												id="btn_last"
												variant="contained"
												size="small"
												onClick={() => {
													handlePagination(totalNoOfPages-1);
												}}
											>
												last
											</Button>
								</div>
							</>
						)}
						</>
					)}
			</div>
		</div>
	);
}

export default Dashboard;
