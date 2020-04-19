import React, { useState } from "react";
import "../sass/Dashboard.sass";
import Collage from "./Collage";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import OptionsSelect from "./OptionsSelect";

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
	const classes = useStyles();
	// let filter = false;
	const [filter, setFilter] = useState(true);
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

	return (
		<div className="main">
			<Navbar />

			<div className="container">
				{filter ? (
					<div className="rowgrid">
						<div className="filterContainer">
							<div className="filters">
								<OptionsSelect type="Brands" arrayOfItems={brandList} />
								<OptionsSelect
									type="Product type"
									arrayOfItems={product_type}
								/>
								<OptionsSelect
									type="category"
									arrayOfItems={product_category}
								/>
								<OptionsSelect type="tags" arrayOfItems={product_tags} />
								<Button id="btn" variant="contained" size="small">
									apply
								</Button>
								<Button id="btn" variant="contained" size="small">
									clear
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
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Dashboard;
